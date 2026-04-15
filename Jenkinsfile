pipeline {
    agent any

    environment {
        DEPLOY_DIR = '/home/ubuntu/web-apps/eventhub'
    }

    stages {
        stage('Clone / Pull') {
            steps {
                sh '''
                    if [ ! -d "$DEPLOY_DIR" ]; then
                        git clone https://github.com/TomCml/Eventhub-DEVOPS2.git "$DEPLOY_DIR"
                    else
                        cd "$DEPLOY_DIR"
                        git pull origin main
                    fi
                '''
            }
        }

        stage('Create env files') {
            steps {
                withCredentials([
                    string(credentialsId: 'db-user', variable: 'DB_USER'),
                    string(credentialsId: 'db-password', variable: 'DB_PASSWORD'),
                    string(credentialsId: 'db-name', variable: 'DB_NAME'),
                    string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET')
                ]) {
                    dir("${DEPLOY_DIR}") {
                        sh '''
                            cat > backend/.env.docker <<EOF
POSTGRES_USER=${DB_USER}
POSTGRES_PASSWORD=${DB_PASSWORD}
POSTGRES_DB=${DB_NAME}
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
PORT=3000
JWT_SECRET=${JWT_SECRET}
EOF

                            echo "frontend env set via build args"
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                dir("${DEPLOY_DIR}") {
                    sh 'VITE_API_BASE=https://eventhub.tom-cml.com/api docker compose -f docker-compose.yml down'
                    sh 'VITE_API_BASE=https://eventhub.tom-cml.com/api docker compose -f docker-compose.yml build'
                    sh 'VITE_API_BASE=https://eventhub.tom-cml.com/api docker compose -f docker-compose.yml up -d'
                    sh 'sleep 10'
                    sh 'docker exec eventhub_backend sh -c "npx ts-node infrastructure/database/seed.ts"'
                }
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed!'
        }
        success {
            echo 'Deployment succeeded!'
        }
    }
}
