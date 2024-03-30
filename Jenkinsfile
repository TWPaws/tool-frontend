pipeline {
    agent any

    tools {nodejs "NodeJS 21.7.1"}

    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Upload')
            steps {
                sh ''
            }
    }
}