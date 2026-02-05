-- Thêm cột cho tính năng quên mật khẩu bằng mã xác thực (khi dùng spring.jpa.hibernate.ddl-auto=none).
-- Chạy script này một lần trên database đã có bảng users.

-- SQL Server
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'users') AND name = 'reset_code')
BEGIN
  ALTER TABLE users ADD reset_code NVARCHAR(10) NULL;
END
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID(N'users') AND name = 'reset_code_expiry')
BEGIN
  ALTER TABLE users ADD reset_code_expiry BIGINT NULL;
END
