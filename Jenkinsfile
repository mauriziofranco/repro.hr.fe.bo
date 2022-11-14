pipeline {
    agent any
    options { timeout(time: 5) }
    parameters {
        booleanParam(name: 'PROMOTE_ON_PRODUCTION', defaultValue: false,
            description: 'Al termine di questa pipeline, vuoi consentire la promozione in ambiente di Produzione?')
    }
    environment {     
        SERVICE_SOURCE_PORT = "8080"  
        REMOTE_WORKING_DIR = "."      
        PACKAGE_FILE_NAME = readMavenPom().getArtifactId();
        ARTIFACT_FULL_FILE_NAME = "repro.hr.fe.bo.war"                      
        APPLICATION_DOCKER_HOST = "rastaban"
        DEV_SERVICES_EXPOSED_PORT="9057"
        STAGE_SERVICES_EXPOSED_PORT="9058"
        PROD_SERVICES_EXPOSED_PORT="9059"
        DOCKER_HOST_CONTAINER_NAME_PREFIX="${PACKAGE_FILE_NAME}"
        DEV_info_app_environment_PROPERTY="DEV"
        STAGE_info_app_environment_PROPERTY="STAGE"
        PROD_info_app_environment_PROPERTY="PROD"
        
    }
    stages {   
        stage ("PREPARE AND DELIVERY FOR DEVELOPMENT ENVIRONMENT --> DOCKERIZED") {
            environment {
                ENV = "dev"
                SERVICES_EXPOSED_PORT = "${DEV_SERVICES_EXPOSED_PORT}" 
            }
            steps {
	            sh "./mvnw clean package -DskipTests -P ${ENV}"
	            echo "archiving build..."
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./Dockerfile ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            echo "MOVING files on docker host"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./${ARTIFACT_FULL_FILE_NAME}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                echo "EXECUTING DEV ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT} ${REMOTE_WORKING_DIR} ${ARTIFACT_FULL_FILE_NAME}"
            }
        }
        stage ("PREPARE AND DELIVERY FOR STAGE ENVIRONMENT --> DOCKERIZED") {
            environment {
                ENV = "stage"
                SERVICES_EXPOSED_PORT = "${STAGE_SERVICES_EXPOSED_PORT}"         
            }
            steps {
	            sh "./mvnw clean package -DskipTests -P ${ENV}"
	            echo "archiving build..."
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./Dockerfile ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            echo "MOVING files on docker host"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./${ARTIFACT_FULL_FILE_NAME}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                echo "EXECUTING DEV ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT} ${REMOTE_WORKING_DIR} ${ARTIFACT_FULL_FILE_NAME}"
            }
        }
        stage ("PREPARE AND DELIVERY FOR PRODUCTION ENVIRONMENT --> DOCKERIZED") {
            when { expression { return params.PROMOTE_ON_PRODUCTION } }
            environment {
                ENV = "prod"         
                SERVICES_EXPOSED_PORT = "${PROD_SERVICES_EXPOSED_PORT}"
            }
            steps {
	            sh "./mvnw clean package -DskipTests -P ${ENV}"
	            echo "archiving build..."
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./Dockerfile ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            echo "MOVING files on docker host"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./${ARTIFACT_FULL_FILE_NAME}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} ${ARTIFACT_FULL_FILE_NAME} cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                sh "/cerepro_resources/scp_on_docker_host.sh ${JOB_NAME} ${BUILD_NUMBER} Dockerfile cerepro_resources ${APPLICATION_DOCKER_HOST} ${ENV}"
                echo "EXECUTING DEV ENVIRONEMNT PROMOTION"
                sh "/cerepro_resources/delivery_on_docker@env.sh ${SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER} ${SERVICE_SOURCE_PORT} ${REMOTE_WORKING_DIR} ${ARTIFACT_FULL_FILE_NAME}"
            }
        }
        
    }
    
    post {
		always {
		
			emailext body: 'Completed Pipeline: ${currentBuild.fullDisplayName}. /n Your build completed, please check: ${env.BUILD_URL}', 
				recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
					[$class: 'RequesterRecipientProvider']], 
					subject: 'Completed Pipeline: ${currentBuild.fullDisplayName}'
		}
	}
}