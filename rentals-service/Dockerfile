# Build stage
FROM eclipse-temurin:21 AS build
WORKDIR /backend
# Copy project files
COPY .mvn/ .mvn/
COPY mvnw .
COPY pom.xml .

# Prepare Maven (wrapper executable)
RUN chmod +x mvnw

# Download dependencies (without source code yet)
RUN ./mvnw dependency:go-offline -B

# Now copy full project (source code, resources, etc.)
COPY src/ src/

# Build application
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre

# Copy the built jar from previous stage
COPY --from=build /backend/target/*.jar /backend/rentals-service.jar

# Expose port (optional, for Kubernetes or Docker run -p)
EXPOSE 8080

# Start the app
ENTRYPOINT ["java", "-jar", "/backend/rentals-service.jar"]