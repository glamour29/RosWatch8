# Sử dụng Eclipse Temurin OpenJDK 17 (recommended)
FROM eclipse-temurin:17-jdk

# Tạo thư mục làm việc
WORKDIR /app

# Copy Maven wrapper và pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Cấp quyền thực thi cho mvnw
RUN chmod +x ./mvnw

# Copy source code
COPY src ./src

# Build ứng dụng
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java", "-jar", "target/WatchShop-0.0.1-SNAPSHOT.jar"]
