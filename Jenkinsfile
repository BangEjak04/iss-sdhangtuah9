pipeline {
    agent any
    environment {
        APP_NAME = 'laravel-app'
        CLOUDFLARE_TUNNEL_TOKEN = credentials('cloudflare-tunnel-token')
        DB_PASSWORD = credentials('laravel-db-password')
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
                echo '<[ Setting up environment ]>'
                sh '''
                    if [ ! -f .env ]; then
                        cp .env.example .env
                    fi

                    docker run --rm \
                        -u "$(id -u):$(id -g)" \
                        -v $(pwd):/var/www/html \
                        -w /var/www/html \
                        laravelsail/php82-composer:latest \
                        composer install --ignore-platform-reqs --no-interaction
                '''

                sh '''
                    sed -i 's/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/' .env
                    sed -i 's/# DB_HOST=127.0.0.1/DB_HOST=mysql/' .env
                    sed -i 's/# DB_PORT=3306/DB_PORT=3306/' .env
                    sed -i 's/# DB_DATABASE=laravel/DB_DATABASE=laravel/' .env
                    sed -i 's/# DB_USERNAME=root/DB_USERNAME=sail/' .env
                    sed -i "s|# DB_PASSWORD=|DB_PASSWORD=${DB_PASSWORD}|" .env
                    sed -i "s|CLOUDFLARE_TUNNEL_TOKEN=.*|CLOUDFLARE_TUNNEL_TOKEN=${CLOUDFLARE_TUNNEL_TOKEN}|" .env
                    sed -i 's/REDIS_HOST=127.0.0.1/REDIS_HOST=redis/' .env
                    sed -i 's/SESSION_DRIVER=database/SESSION_DRIVER=redis/' .env
                    sed -i 's/CACHE_STORE=database/CACHE_STORE=redis/' .env
                    sed -i 's/APP_ENV=local/APP_ENV=production/' .env
                    sed -i 's/APP_DEBUG=true/APP_DEBUG=false/' .env

                    # Setup Redis
                    sed -i 's/REDIS_HOST=127.0.0.1/REDIS_HOST=redis/' .env
                    sed -i 's/SESSION_DRIVER=database/SESSION_DRIVER=redis/' .env
                    sed -i 's/CACHE_STORE=database/CACHE_STORE=redis/' .env
                '''
            }
        }
        stage('Test') {
            steps {
                echo '<[ Running tests ]>'
                sh 'chmod +x vendor/bin/sail'
                sh './vendor/bin/sail artisan test || true'
            }
        }
        stage('Deploy & Build') {
            steps {
                echo '<[ Deploying & Building Assets ]>'
                sh '''
                    ./vendor/bin/sail up -d --build

                    sleep 15
                    
                    ./vendor/bin/sail artisan config:cache
                    ./vendor/bin/sail artisan event:cache
                    ./vendor/bin/sail artisan route:cache
                    ./vendor/bin/sail artisan view:cache

                    ./vendor/bin/sail artisan queue:restart

                    ./vendor/bin/sail npm install
                    ./vendor/bin/sail npm run build

                    ./vendor/bin/sail exec -u root laravel.test chown -R sail:sail storage bootstrap/cache
                    ./vendor/bin/sail exec -u root laravel.test chmod -R 775 storage bootstrap/cache
                '''
            }
        }
    }
    post {
        success {
            echo '<[ Deployment successful! ]>'
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
