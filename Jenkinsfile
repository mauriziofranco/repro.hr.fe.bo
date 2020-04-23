pipeline {
    agent any
    options { timeout(time: 5) }
    parameters {
        booleanParam(name: 'PROMOTE_ON_PRODUCTION', defaultValue: false,
            description: 'Al termine di questa pipeline, vuoi consentire la promozione in ambiente di Produzione?')
    }
    environment {             
        /*
        PACKAGE_FILE_NAME = readMavenPom().getArtifactId();
        PACKAGING = readMavenPom().getPackaging()
        VERSION = readMavenPom().getVersion()
        ARTIFACT_FULL_FILE_NAME = "${PACKAGE_FILE_NAME}-${VERSION}.${PACKAGING}"
        */
        ARTIFACT_FULL_FILE_NAME = "centauri.war"
        DEV_TOMCAT_HOST = "eltanin"
        TARGET_ENV_TMP_FOLDER = "cerepro_resources"
        TOMCAT_WEB_APPS_FOLDER = "tomcat_webapps"
        
        
        
        APPLICATION_DOCKER_HOST = "rastaban"
        DEV_SERVICES_EXPOSED_PORT="9054"
        STAGE_SERVICES_EXPOSED_PORT="9055"
        PROD_SERVICES_EXPOSED_PORT="9056"
        /*APPLICATION_CONTEXT_ROOT="cerepro.hr.backend"*/
        DOCKER_HOST_CONTAINER_NAME_PREFIX="${PACKAGE_FILE_NAME}"
        DEV_info_app_environment_PROPERTY="DEV"
        STAGE_info_app_environment_PROPERTY="STAGE"
        PROD_info_app_environment_PROPERTY="PROD"
        
    }
    stages { 
        /*       
        stage ("DELETE DEVELOPMENT PROPERTIES FILE") {
            environment {
                ENV_PROPERTIES_FILE = "./src/main/webapp/common/js/env/env.js"
            }
            steps {
                echo "Deleting file: ${ENV_PROPERTIES_FILE}"
                sh "rm ${ENV_PROPERTIES_FILE}"
            }
        }
        stage ("PREPARE FULL PACKAGE(and archive it!!") {
            steps {
                
                echo "Preparing artifact: ${ARTIFACT_FULL_FILE_NAME}"
                sh "./mvnw clean package -DskipTests"
                echo "Archiving artifact: ${ARTIFACT_FULL_FILE_NAME}"
                sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./${ARTIFACT_FULL_FILE_NAME}"
                archiveArtifacts artifacts: "${ARTIFACT_FULL_FILE_NAME}", onlyIfSuccessful: true
                archiveArtifacts artifacts: "Dockerfile", onlyIfSuccessful: true
                
            }
        }        
        */
        stage ("PREPARE AND DELIVERY FOR DEVELOPMENT ENVIRONMENT") {
            environment {
                ENV = "dev"
                TOMCAT_HOST = "${DEV_TOMCAT_HOST}"
            }
            steps {
            sh "./mvnw clean package -DskipTests -P ${ENV}"
            echo "archiving build..."
            sh "mkdir -p ${JENKINS_HOME}/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}/archive"
            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ${JENKINS_HOME}/${JOB_NAME}/builds/${BUILD_NUMBER}/${ENV}/archive"
            /*
            sh "mkdir -p ./dist/${BUILD_NUMBER}/${ENV}"
            sh "cp ./target/${ARTIFACT_FULL_FILE_NAME} ./dist/${BUILD_NUMBER}/${ENV}"
            sh "mkdir -p ${JENKINS_HOME}/jobs/${JOB_NAME}/dist/${BUILD_NUMBER}/${ENV}"
            sh "cp ./dist/${BUILD_NUMBER}/${ENV}/*.* ${JENKINS_HOME}/jobs/${JOB_NAME}/dist/${BUILD_NUMBER}/${ENV}"
            */
            echo "delivering build"
            sh "/cerepro_resources/scp_put@env.sh ${JOB_NAME} ${BUILD_NUMBER} ${ENV} ${ARTIFACT_FULL_FILE_NAME} ${TARGET_ENV_TMP_FOLDER} ${TOMCAT_HOST}"
            sh "/cerepro_resources/delivery@env.sh ${ARTIFACT_FULL_FILE_NAME} ${TARGET_ENV_TMP_FOLDER} ${TOMCAT_HOST} ${TOMCAT_WEB_APPS_FOLDER}"
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