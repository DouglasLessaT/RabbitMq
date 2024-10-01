FROM ubuntu:latest

# Set the working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    openjdk-17-jdk \
    maven \
    wget \
    gnupg \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*  # Clean up APT when done

# Copy Maven configuration and source code
COPY pom.xml .
COPY src ./src

ENV KAFKA_BROKER=kafka:9092

# Build the application pula os teste
RUN mvn clean package -DskipTests 

# Set the working directory for the final executable
WORKDIR /app/target

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "m1sevicepayament-0.0.1-SNAPSHOT.jar"]
