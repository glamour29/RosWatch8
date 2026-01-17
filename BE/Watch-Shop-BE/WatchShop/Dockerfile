# Sử dụng Eclipse Temurin OpenJDK 17 với Maven (recommended)
FROM eclipse-temurin:17-jdk

# Cài đặt Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Tạo thư mục làm việc
WORKDIR /app

# Copy pom.xml trước (để cache dependencies)
COPY pom.xml .

# Download dependencies (cache layer)
RUN mvn dependency:go-offline -B || true

# Copy source code
COPY src ./src

# Build ứng dụng
RUN mvn clean package -DskipTests

# Expose port
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "target/WatchShop-0.0.1-SNAPSHOT.jar"]
