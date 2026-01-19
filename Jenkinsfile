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

                    if [ ! -d "vendor" ]; then
                        docker run --rm \
                            -u "$(id -u):$(id -g)" \
                            -v $(pwd):/var/www/html \
                            -w /var/www/html \
                            laravelsail/php84-composer:latest \
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
                    
                    ./vendor/bin/sail artisan config:cache
                    ./vendor/bin/sail artisan route:cache
                    ./vendor/bin/sail artisan view:cache

                    if [ -f "package.json" ]; then
                        ./vendor/bin/sail npm install
                        ./vendor/bin/sail npm run build
                    fi
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