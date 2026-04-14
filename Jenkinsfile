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

        stage('Deploy') {
            steps {
                dir("${DEPLOY_DIR}") {
                    sh 'docker compose down'
                    sh 'docker compose build'
                    sh 'docker compose up -d'
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
