-- ============================================
-- Tài khoản ADMIN để test (SQL Server - database watchshop)
-- Chạy file này SAU khi đã chạy roles.sql (có ROLE_USER và ROLE_ADMIN)
-- ============================================

USE watchshop;
GO

-- Chèn 1 user ADMIN (mật khẩu: 123456)
-- id_role = 2 tương ứng ROLE_ADMIN (id=1 là ROLE_USER)
IF NOT EXISTS (SELECT 1 FROM users WHERE email = N'admin@gmail.com')
BEGIN
  INSERT INTO users (address, birth_date, email, full_name, password, phone, id_role, is_deleted)
  VALUES (
    N'Cà Mau',
    '2005-10-29',
    N'admin@gmail.com',
    N'Admin',
    N'$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    N'0968794894',
    2,
    0
  );
  PRINT N'Đã tạo tài khoản admin.';
END
ELSE
  PRINT N'Email admin@gmail.com đã tồn tại, bỏ qua.';
GO
