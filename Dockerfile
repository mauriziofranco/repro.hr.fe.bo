FROM tomcat:9.0.34-jdk11-openjdk-slim
LABEL maintainer="Maurizio Franco"
#COPY ./target/centauri.war /usr/local/tomcat/webapps/centauri.war
COPY ./centauri.war /usr/local/tomcat/webapps/centauri.war
RUN ln -sf /cerepro/candidates/img /usr/local/tomcat/webapps/canimg
RUN ln -sf /cerepro/candidates/cv  /usr/local/tomcat/webapps/cancv

