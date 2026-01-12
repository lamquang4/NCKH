FROM maven:3-openjdk-17 AS build
WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

COPY --from=build /app/target/eureka-server-0.0.1-SNAPSHOT.jar .

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "eureka-server-0.0.1-SNAPSHOT.jar"]