-- ============================================
-- IMPORT USERS DATA TO SUPABASE
-- Copy toàn bộ file này vào Supabase SQL Editor và Run
-- ============================================

-- Bước 1: Kiểm tra và tạo Roles nếu chưa có
-- Nếu roles đã có rồi thì bỏ qua bước này

-- Kiểm tra roles hiện có
SELECT * FROM roles;

-- Nếu chưa có roles, uncomment 2 dòng dưới để insert:
-- INSERT INTO roles (id, name) VALUES (1, 'ROLE_USER') ON CONFLICT (id) DO NOTHING;
-- INSERT INTO roles (id, name) VALUES (2, 'ROLE_ADMIN') ON CONFLICT (id) DO NOTHING;

-- Bước 2: Insert Users (passwords đã được hash bcrypt)
-- LƯU Ý: Passwords đã hash, không thể lấy lại password gốc
-- Nếu muốn test login, cần biết password gốc hoặc reset password
-- Nếu gặp lỗi duplicate email, có thể skip user đó hoặc xóa user cũ trước

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '2005-10-29', 'duyle3352@gmail.com', 'LeTrieuDuy',
        '$2a$10$QRTp1MtPrdaDMgoI6ZkvtepcqSoLotkormJymdkgLMqi1kmbiSa6G', '0968794894', 1, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '2005-10-29', 'duyle3352@gmail.com', 'LeTrieuDuy1',
        '$2a$10$k4f0klHWx1/FUd95MUT73uqBwQ.zjt717WepgkCgFDcI8RazOSy9.', '0968794894', 2, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Sóc Trăng', '2005-10-29', 'garanhutmau256@gmail.com', 'NguyenTruongAn',
        '$2a$10$Ghh0EBU4xueljTnAaEd3uez964IT03URwU6Vaib4VWnre4FtifqCi', '0968794894', 1, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Bạc Liêu', '2005-10-29', 'hongtrungkien.gr2022@gmail.com', 'Hong Trung Kien',
        '$2a$10$fij97V3iXOFOlayZB.Am..UnDjLRXF8AAplHUEkzimYz8GhofJKt6', '0968794894', 1, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '2005-10-29', 'quocvogiarai0808@gmail.com', 'Vo Anh Quoc',
        '$2a$10$EqzhUzqqW1hi3c5bfRcye.HaQULB1zAkJgHYi.QXKqYdhL5TM3rAe', '0952342341', 1, false);

INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
VALUES ('Cà Mau', '2005-10-29', 'quocvogiarai0808@gmail.com', 'VoAnhQuoc1',
        '$2a$10$SG81I5CPdU6Vv25QA3p/Cemvp4xs5Ehk6E/P0RElk.QWkv4M2VbAC', '0935169835', 1, false);

-- Kiểm tra kết quả
SELECT id, email, full_name, id_role FROM users;
