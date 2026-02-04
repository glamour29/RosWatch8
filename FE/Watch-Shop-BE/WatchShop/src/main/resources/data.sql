-- Insert brands
INSERT INTO brands (create_date, name, update_date) VALUES (CURRENT_DATE, 'Samsung', CURRENT_DATE);
INSERT INTO brands (create_date, name, update_date) VALUES (CURRENT_DATE, 'Apple', CURRENT_DATE);
INSERT INTO brands (create_date, name, update_date) VALUES (CURRENT_DATE, 'Garmin', CURRENT_DATE);
INSERT INTO brands (create_date, name, update_date) VALUES (CURRENT_DATE, 'Casio', CURRENT_DATE);

-- Insert sample products
INSERT INTO products (color, create_date, description, discount, face_material, face_size, frame_material, model, name, origin, price, product_weight, quantity, screen_size, sold_quantity, update_date, warranty_period, wire_material, id_brand)
VALUES ('Đen', CURRENT_DATE, 'Đồng hồ thông minh Samsung Galaxy Watch6 Bluetooth 44mm Bạc', 10, 'Kính Sapphire', 44, 'Thép không gỉ', 'Galaxy Watch6', 'Đồng hồ thông minh Samsung Galaxy Watch6 Bluetooth 44mm Bạc', 'Việt Nam', 7490000, 0.015, 100, 44, 0, CURRENT_DATE, 12, 'Thép không gỉ', 1);

INSERT INTO products (color, create_date, description, discount, face_material, face_size, frame_material, model, name, origin, price, product_weight, quantity, screen_size, sold_quantity, update_date, warranty_period, wire_material, id_brand)
VALUES ('Bạc', CURRENT_DATE, 'Apple Watch Series 8 GPS + Cellular 41mm viền nhôm dây thể thao', 10, 'Kính Sapphire', 41, 'Nhôm', 'Series 8', 'Apple Watch Series 8 GPS + Cellular 41mm viền nhôm dây thể thao', 'Việt Nam', 11990000, 0.015, 100, 41, 0, CURRENT_DATE, 12, 'Cao su', 2);

INSERT INTO products (color, create_date, description, discount, face_material, face_size, frame_material, model, name, origin, price, product_weight, quantity, screen_size, sold_quantity, update_date, warranty_period, wire_material, id_brand)
VALUES ('Đen', CURRENT_DATE, 'Đồng hồ thông minh Garmin Instinct 2 Solar, GPS', 15, 'Kính Sapphire', 45, 'Polymer', 'Instinct 2', 'Đồng hồ thông minh Garmin Instinct 2 Solar, GPS', 'Việt Nam', 11210000, 0.015, 100, 45, 0, CURRENT_DATE, 12, 'Silicone', 3);

INSERT INTO products (color, create_date, description, discount, face_material, face_size, frame_material, model, name, origin, price, product_weight, quantity, screen_size, sold_quantity, update_date, warranty_period, wire_material, id_brand)
VALUES ('Đen', CURRENT_DATE, 'Đồng hồ Casio 42.1 mm Nam WS-1600H-1AVDF', 20, 'Kính Sapphire', 42, 'Nhựa', 'WS-1600H', 'Đồng hồ Casio 42.1 mm Nam WS-1600H-1AVDF', 'Nhật Bản', 1990000, 0.015, 100, 42, 0, CURRENT_DATE, 12, 'Nhựa', 4);

INSERT INTO products (color, create_date, description, discount, face_material, face_size, frame_material, model, name, origin, price, product_weight, quantity, screen_size, sold_quantity, update_date, warranty_period, wire_material, id_brand)
VALUES ('Trắng', CURRENT_DATE, 'Đồng hồ thông minh Samsung Galaxy Watch5 44mm', 12, 'Kính Sapphire', 44, 'Thép không gỉ', 'Galaxy Watch5', 'Đồng hồ thông minh Samsung Galaxy Watch5 44mm', 'Việt Nam', 6490000, 0.015, 100, 44, 0, CURRENT_DATE, 12, 'Thép không gỉ', 1);

INSERT INTO products (color, create_date, description, discount, face_material, face_size, frame_material, model, name, origin, price, product_weight, quantity, screen_size, sold_quantity, update_date, warranty_period, wire_material, id_brand)
VALUES ('Vàng', CURRENT_DATE, 'Apple Watch Series 9 GPS + Cellular 45mm viền thép dây thép', 8, 'Kính Sapphire', 45, 'Thép không gỉ', 'Series 9', 'Apple Watch Series 9 GPS + Cellular 45mm viền thép dây thép', 'Việt Nam', 21590000, 0.015, 100, 45, 0, CURRENT_DATE, 12, 'Thép không gỉ', 2);

INSERT INTO products (color, create_date, description, discount, face_material, face_size, frame_material, model, name, origin, price, product_weight, quantity, screen_size, sold_quantity, update_date, warranty_period, wire_material, id_brand)
VALUES ('Xanh dương', CURRENT_DATE, 'Đồng hồ thông minh Garmin Forerunner 255S, GPS', 10, 'Kính Sapphire', 46, 'Polymer', 'Forerunner 255S', 'Đồng hồ thông minh Garmin Forerunner 255S, GPS', 'Việt Nam', 8990000, 0.015, 100, 46, 0, CURRENT_DATE, 12, 'Silicone', 3);

INSERT INTO products (color, create_date, description, discount, face_material, face_size, frame_material, model, name, origin, price, product_weight, quantity, screen_size, sold_quantity, update_date, warranty_period, wire_material, id_brand)
VALUES ('Bạc', CURRENT_DATE, 'Đồng hồ Casio 34 mm Nam MTP-M305D-1AVDF', 15, 'Kính Sapphire', 34, 'Thép không gỉ', 'MTP-M305D', 'Đồng hồ Casio 34 mm Nam MTP-M305D-1AVDF', 'Nhật Bản', 2990000, 0.015, 100, 34, 0, CURRENT_DATE, 12, 'Thép không gỉ', 4);

-- Insert sample images for products
INSERT INTO images (create_date, id_product, source, update_date) VALUES (CURRENT_DATE, 1, '/image/sample1.jpg', CURRENT_DATE);
INSERT INTO images (create_date, id_product, source, update_date) VALUES (CURRENT_DATE, 2, '/image/sample2.jpg', CURRENT_DATE);
INSERT INTO images (create_date, id_product, source, update_date) VALUES (CURRENT_DATE, 3, '/image/sample3.jpg', CURRENT_DATE);
INSERT INTO images (create_date, id_product, source, update_date) VALUES (CURRENT_DATE, 4, '/image/sample4.jpg', CURRENT_DATE);
INSERT INTO images (create_date, id_product, source, update_date) VALUES (CURRENT_DATE, 5, '/image/sample5.jpg', CURRENT_DATE);
INSERT INTO images (create_date, id_product, source, update_date) VALUES (CURRENT_DATE, 6, '/image/sample6.jpg', CURRENT_DATE);
INSERT INTO images (create_date, id_product, source, update_date) VALUES (CURRENT_DATE, 7, '/image/sample7.jpg', CURRENT_DATE);
INSERT INTO images (create_date, id_product, source, update_date) VALUES (CURRENT_DATE, 8, '/image/sample8.jpg', CURRENT_DATE);

-- Insert sample roles
INSERT INTO roles (name) VALUES ('USER');
INSERT INTO roles (name) VALUES ('ADMIN');

-- Insert sample users
INSERT INTO users (birth_date, is_deleted, id_role, address, email, full_name, password, phone)
VALUES (CURRENT_DATE, false, 1, 'Hà Nội', 'user@example.com', 'Nguyễn Văn A', '$2a$10$examplehashedpassword', '0123456789');

INSERT INTO users (birth_date, is_deleted, id_role, address, email, full_name, password, phone)
VALUES (CURRENT_DATE, false, 2, 'Hồ Chí Minh', 'admin@example.com', 'Trần Thị B', '$2a$10$examplehashedpassword', '0987654321');
