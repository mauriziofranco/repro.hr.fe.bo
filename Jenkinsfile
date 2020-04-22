pipeline {
    agent any
    options { timeout(time: 5) }
    parameters {
        booleanParam(name: 'PROMOTE_ON_PRODUCTION', defaultValue: false,
            description: 'Al termine di questa pipeline, vuoi consentire la promozione in ambiente di Produzione?')
    }
    environment {             
        PACKAGE_FILE_NAME = readMavenPom().getArtifactId();
        PACKAGING = readMavenPom().getPackaging()
        ARTIFACT_FULL_FILE_NAME = "${PACKAGE_FILE_NAME}.${PACKAGING}"
        
        
        
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
    }
    post {
		always {
			mail to: 'm.franco@proximanetwork.it',
			subject: "Completed Pipeline: ${currentBuild.fullDisplayName}",
			body: "Your build completed, please check: ${env.BUILD_URL}"
		}
	}
}