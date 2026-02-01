-- ============================================
-- IMPORT TEST USERS TO SUPABASE
-- Password cho TẤT CẢ users: 123456
-- Copy toàn bộ file này vào Supabase SQL Editor và Run
-- ============================================

-- Bước 1: Kiểm tra Roles
SELECT * FROM roles;

-- Nếu chưa có roles, uncomment 2 dòng dưới:
-- INSERT INTO roles (id, name) VALUES (1, 'ROLE_USER');
-- INSERT INTO roles (id, name) VALUES (2, 'ROLE_ADMIN');

-- Bước 2: Insert Users với password = "123456" (đã hash BCrypt)
-- TẤT CẢ users có password giống nhau: 123456

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '2005-10-29', 'test1@gmail.com', 'Test User 1',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '0968794894', 1, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '2005-10-29', 'admin@gmail.com', 'Admin User',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '0968794894', 2, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '2005-10-29', 'test2@gmail.com', 'Test User 2',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '0968794894', 1, false);

-- Kiểm tra kết quả
SELECT id, email, full_name, id_role FROM users;
