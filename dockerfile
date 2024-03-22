FROM openjdk:17-jdk-alpine
COPY target/DockerizedPgsql-1.0.0.jar java-app-dockerizedpgsql.jar
ENTRYPOINT [ "java", "-jar", "java-app-dockerizedpgsql.jar" ]