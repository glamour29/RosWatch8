
SELECT * FROM roles;


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
