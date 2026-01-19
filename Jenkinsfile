pipeline {
    agent any
    environment {
        APP_NAME = 'laravel-app'
        CLOUDFLARE_TUNNEL_TOKEN = credentials('cloudflare-tunnel-token')
    }
    stages {
        stage('Checkout') {
            steps {
                echo '<[ Pulling latest code ]>'
                checkout scm
            }
        }
        stage('Setup') {
            steps {
                echo '<[ Setup environment before build ]>'
                sh '''
                    if [ ! -f .env ]; then
                        cp .env.example .env
                    fi

                    sed -i 's/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/' .env
                    sed -i 's/# DB_HOST=127.0.0.1/DB_HOST=mysql/' .env
                    sed -i 's/# DB_PORT=3306/DB_PORT=3306/' .env
                    sed -i 's/# DB_DATABASE=laravel/DB_DATABASE=laravel/' .env
                    sed -i 's/# DB_USERNAME=root/DB_USERNAME=sail/' .env
                    sed -i 's/# DB_PASSWORD=/DB_PASSWORD=password/' .env
                    sed -i "s|CLOUDFLARE_TUNNEL_TOKEN=.*|CLOUDFLARE_TUNNEL_TOKEN=${CLOUDFLARE_TUNNEL_TOKEN}|" .env
                    sed -i 's/REDIS_HOST=127.0.0.1/REDIS_HOST=redis/' .env
                    sed -i 's/SESSION_DRIVER=database/SESSION_DRIVER=redis/' .env
                    sed -i 's/CACHE_STORE=database/CACHE_STORE=redis/' .env
                    sed -i 's/APP_ENV=local/APP_ENV=production/' .env
                    sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env

                    if [ ! -d "vendor" ]; then
                        docker run --rm \
                            -u "$(id -u):$(id -g)" \
                            -v $(pwd):/var/www/html \
                            -w /var/www/html \
                            laravelsail/php82-composer:latest \
                            composer install --ignore-platform-reqs --no-interaction
                    fi

                    chmod +x vendor/bin/sail
                '''
            }
        }
        stage('Build') {
            steps {
                echo '<[ Building application ]>'
                sh '''
                    ./vendor/bin/sail down || true
                    ./vendor/bin/sail up -d --build

                    sleep 15

                    if ! grep -q "APP_KEY=base64:" .env; then
                        ./vendor/bin/sail artisan key:generate --force
                    fi

                    ./vendor/bin/sail artisan migrate --force
                '''
            }
        }
        stage('Test') {
            steps {
                echo '<[ Running tests ]>'
                sh './vendor/bin/sail artisan test || true'
            }
        }
        stage('Deploy') {
            steps {
                echo '<[ Deploying application ]>'
                sh '''
                    ./vendor/bin/sail up -d

                    sleep 15

                    ./vendor/bin/sail artisan migrate --force

                    ./vendor/bin/sail artisan config:clear
                    ./vendor/bin/sail artisan cache:clear
                    ./vendor/bin/sail artisan view:clear
                    ./vendor/bin/sail artisan route:clear

                    ./vendor/bin/sail artisan config:cache
                    ./vendor/bin/sail artisan route:cache
                    ./vendor/bin/sail artisan view:cache

                    if [ -f "package.json" ]; then
                        ./vendor/bin/sail npm install
                        ./vendor/bin/sail npm run build
                    fi

                    ./vendor/bin/sail exec laravel.test chmod -R 775 storage bootstrap/cache
                    ./vendor/bin/sail exec laravel.test chown -R sail:sail storage bootstrap/cache
                '''
            }
        }
    }
    post {
        success {
            echo '<[ Deployment successful! ]>'
            echo '<[ Application is running at http://localhost ]>'
        }
        failure {
            echo '<[ Deployment failed! ]>'
            script {
                sh './vendor/bin/sail down || true'
            }
        }
        always {
            echo '<[ Build completed at: ' + new Date().toString() + ' ]>'
        }
    }
}
