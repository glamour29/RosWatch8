-- ============================================
-- IMPORT TEAM MEMBERS TO SUPABASE
-- Password cho TẤT CẢ users: 123456
-- Copy toàn bộ file này vào Supabase SQL Editor và Run
-- ============================================

-- Bước 1: Kiểm tra Roles
SELECT * FROM roles;

-- Nếu chưa có roles, uncomment 2 dòng dưới:
-- INSERT INTO roles (id, name) VALUES (1, 'ROLE_USER');
-- INSERT INTO roles (id, name) VALUES (2, 'ROLE_ADMIN');

-- Bước 2: Insert Team Members
-- TẤT CẢ users có password giống nhau: 123456
-- BCrypt hash cho "123456": $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '1997-01-01', 'duyle3352@gmail.com', 'LeTrieuDuy',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '0123456789', 1, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Sóc Trăng', '1997-01-01', 'garanhutmau256@gmail.com', 'NguyenTruongAn',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '0123456789', 1, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Bạc Liêu', '1997-01-01', 'hongtrungkien.gr2022@gmail.com', 'Hong Trung Kien',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '0123456789', 1, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '1997-01-01', 'quocvogiarai0808@gmail.com', 'Vo Anh Quoc',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '0123456789', 2, false);

-- Kiểm tra kết quả
SELECT id, email, full_name, id_role FROM users ORDER BY id;
