
SELECT * FROM roles;



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

SELECT id, email, full_name, id_role FROM users ORDER BY id;
