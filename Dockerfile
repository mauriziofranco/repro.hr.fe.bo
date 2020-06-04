FROM tomcat:9.0.34-jdk11-openjdk-slim
LABEL maintainer="Maurizio Franco"
#COPY ./target/repro.hr.fe.bo.war /usr/local/tomcat/webapps/repro.hr.fe.bo.war
#COPY ./repro.hr.fe.bo.war /usr/local/tomcat/webapps/repro.hr.fe.bo.war
WORKDIR /usr/local/tomcat/webapps
ARG artifact
COPY ./$artifact ./
RUN ln -sf /cerepro/candidates/img /usr/local/tomcat/webapps/canimg
RUN ln -sf /cerepro/candidates/cv  /usr/local/tomcat/webapps/cancv
#RUN ln -sf /cerepro/itconsultants/img /usr/local/tomcat/webapps/itcimg
#RUN ln -sf /cerepro/itconsultants/cv /usr/local/tomcat/webapps/itccv

