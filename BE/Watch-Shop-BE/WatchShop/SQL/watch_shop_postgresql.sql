-- PostgreSQL Schema for Watch Shop
-- Converted from SQL Server

-- Create tables

CREATE TABLE brands (
	id BIGSERIAL PRIMARY KEY,
	create_date DATE,
	name VARCHAR(255),
	update_date DATE
);

CREATE TABLE roles (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255)
);

CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	address VARCHAR(250),
	birth_date DATE,
	email VARCHAR(255) NOT NULL,
	full_name VARCHAR(250) NOT NULL,
	is_deleted BOOLEAN,
	password VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL,
	id_role BIGINT,
	FOREIGN KEY (id_role) REFERENCES roles(id)
);

CREATE TABLE products (
	id BIGSERIAL PRIMARY KEY,
	color VARCHAR(255),
	create_date DATE,
	description TEXT,
	discount DOUBLE PRECISION,
	face_material VARCHAR(255),
	face_size DOUBLE PRECISION,
	frame_material VARCHAR(255),
	model VARCHAR(255),
	name VARCHAR(255),
	origin VARCHAR(255),
	price DOUBLE PRECISION,
	product_weight DOUBLE PRECISION,
	quantity INTEGER,
	screen_size DOUBLE PRECISION,
	sold_quantity INTEGER,
	update_date DATE,
	warranty_period INTEGER,
	wire_material VARCHAR(255),
	id_brand BIGINT,
	FOREIGN KEY (id_brand) REFERENCES brands(id)
);

CREATE TABLE images (
	id BIGSERIAL PRIMARY KEY,
	create_date DATE,
	source VARCHAR(255),
	update_date DATE,
	id_product BIGINT NOT NULL,
	FOREIGN KEY (id_product) REFERENCES products(id)
);

CREATE TABLE carts (
	id BIGSERIAL PRIMARY KEY,
	quantity BIGINT NOT NULL,
	user_id BIGINT UNIQUE,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_detail (
	id BIGSERIAL PRIMARY KEY,
	create_date DATE,
	quantity INTEGER NOT NULL,
	update_date DATE,
	id_cart BIGINT,
	id_product BIGINT,
	FOREIGN KEY (id_cart) REFERENCES carts(id),
	FOREIGN KEY (id_product) REFERENCES products(id)
);

CREATE TABLE orders (
	id BIGSERIAL PRIMARY KEY,
	create_date DATE,
	date DATE,
	order_code VARCHAR(255),
	status VARCHAR(255),
	total DOUBLE PRECISION,
	update_date DATE,
	user_id BIGINT,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_detail (
	id BIGSERIAL PRIMARY KEY,
	create_date DATE,
	quantity INTEGER NOT NULL,
	update_date DATE,
	id_order BIGINT,
	id_product BIGINT,
	FOREIGN KEY (id_order) REFERENCES orders(id),
	FOREIGN KEY (id_product) REFERENCES products(id)
);

CREATE TABLE rating (
	id BIGSERIAL PRIMARY KEY,
	create_date DATE,
	star DOUBLE PRECISION,
	update_date DATE,
	id_product BIGINT UNIQUE,
	id_user BIGINT UNIQUE,
	FOREIGN KEY (id_product) REFERENCES products(id),
	FOREIGN KEY (id_user) REFERENCES users(id)
);

-- Create indexes
CREATE UNIQUE INDEX idx_carts_user_id ON carts(user_id) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_products_name ON products(name) WHERE name IS NOT NULL;
CREATE UNIQUE INDEX idx_rating_product ON rating(id_product) WHERE id_product IS NOT NULL;
CREATE UNIQUE INDEX idx_rating_user ON rating(id_user) WHERE id_user IS NOT NULL;
