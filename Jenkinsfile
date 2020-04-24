pipeline {
    agent any
    options { timeout(time: 5) }
    parameters {
        booleanParam(name: 'PROMOTE_ON_PRODUCTION', defaultValue: false,
            description: 'Al termine di questa pipeline, vuoi consentire la promozione in ambiente di Produzione?')
    }
    environment {             
        /*
        PACKAGING = readMavenPom().getPackaging()
        VERSION = readMavenPom().getVersion()
        ARTIFACT_FULL_FILE_NAME = "${PACKAGE_FILE_NAME}-${VERSION}.${PACKAGING}"
        */
        PACKAGE_FILE_NAME = readMavenPom().getArtifactId();
        ARTIFACT_FULL_FILE_NAME = "centauri.war"
        DEV_TOMCAT_HOST = "eltanin"
        STAGE_TOMCAT_HOST = "ndraconis"
        PROD_TOMCAT_HOST = "thuban"
        TARGET_ENV_TMP_FOLDER = "cerepro_resources"
        TOMCAT_WEB_APPS_FOLDER = "tomcat_webapps"
                      
        APPLICATION_DOCKER_HOST = "rastaban"
        DEV_SERVICES_EXPOSED_PORT="9057"
        STAGE_SERVICES_EXPOSED_PORT="9058"
        PROD_SERVICES_EXPOSED_PORT="9059"
        DOCKER_HOST_CONTAINER_NAME_PREFIX="${PACKAGE_FILE_NAME}"
        /*APPLICATION_CONTEXT_ROOT="cerepro.hr.backend"*/
        DEV_info_app_environment_PROPERTY="DEV"
        STAGE_info_app_environment_PROPERTY="STAGE"
        PROD_info_app_environment_PROPERTY="PROD"
        
    }
    stages {         
        stage ("PREPARE AND DELIVERY FOR DEVELOPMENT ENVIRONMENT") {
            environment {
                ENV = "dev"
                TOMCAT_HOST = "${DEV_TOMCAT_HOST}"
            }
            steps {
	            sh "./mvnw clean package -DskipTests -P ${ENV}"
	            echo "archiving build..."
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            /*
	            sh "mkdir -p ./dist/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./dist/${BUILD_NUMBER}/${ENV}"
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/dist/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./dist/${BUILD_NUMBER}/${ENV}/*.* ${JENKINS_HOME}/jobs/${JOB_NAME}/dist/${BUILD_NUMBER}/${ENV}"
	            */
	            echo "delivering build..."
	            sh "/cerepro_resources/scp_put@env.sh ${JOB_NAME} ${BUILD_NUMBER} ${ENV} ${ARTIFACT_FULL_FILE_NAME} ${TARGET_ENV_TMP_FOLDER} ${TOMCAT_HOST}"
	            sh "/cerepro_resources/delivery@env.sh ${ARTIFACT_FULL_FILE_NAME} ${TARGET_ENV_TMP_FOLDER} ${TOMCAT_HOST} ${TOMCAT_WEB_APPS_FOLDER}"
            }
        }
        stage ("PREPARE AND DELIVERY FOR STAGE ENVIRONMENT") {
            environment {
                ENV = "stage"
                TOMCAT_HOST = "${STAGE_TOMCAT_HOST}"
            }
            steps {
	            sh "./mvnw clean package -DskipTests -P ${ENV}"
	            echo "archiving build..."
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            echo "delivering build..."
	            sh "/cerepro_resources/scp_put@env.sh ${JOB_NAME} ${BUILD_NUMBER} ${ENV} ${ARTIFACT_FULL_FILE_NAME} ${TARGET_ENV_TMP_FOLDER} ${TOMCAT_HOST}"
	            sh "/cerepro_resources/delivery@env.sh ${ARTIFACT_FULL_FILE_NAME} ${TARGET_ENV_TMP_FOLDER} ${TOMCAT_HOST} ${TOMCAT_WEB_APPS_FOLDER}"
            }
        }
        stage ("PREPARE AND DELIVERY FOR PROD ENVIRONMENT") {
            when { expression { return params.PROMOTE_ON_PRODUCTION } }
            environment {
                ENV = "prod"
                TOMCAT_HOST = "${PROD_TOMCAT_HOST}"
            }
            steps {
	            sh "./mvnw clean package -DskipTests -P ${ENV}"
	            echo "archiving build..."
	            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/jobs/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}"
	            echo "delivering build..."
	            sh "/cerepro_resources/scp_put@env.sh ${JOB_NAME} ${BUILD_NUMBER} ${ENV} ${ARTIFACT_FULL_FILE_NAME} ${TARGET_ENV_TMP_FOLDER} ${TOMCAT_HOST}"
	            sh "/cerepro_resources/delivery@env.sh ${ARTIFACT_FULL_FILE_NAME} ${TARGET_ENV_TMP_FOLDER} ${TOMCAT_HOST} ${TOMCAT_WEB_APPS_FOLDER}"
            }
        }
        stage ("PREPARE AND DELIVERY FOR DEVELOPMENT ENVIRONMENT --> DOCKERIZED") {
            environment {
                ENV = "dev"
                TOMCAT_HOST = "${DEV_TOMCAT_HOST}"
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
                sh "/cerepro_resources/delivery_on_docker@env.sh ${DEV_SERVICES_EXPOSED_PORT} ${ENV} ${DOCKER_HOST_CONTAINER_NAME_PREFIX} ${BUILD_NUMBER}"
            }
        }
        
    }
    post {
		always {
			mail to: 'm.franco@proximanetwork.it',
			subject: "Completed Pipeline: ${currentBuild.fullDisplayName}",
			body: "Your build completed, please check: ${env.BUILD_URL}"
		}
	}
}