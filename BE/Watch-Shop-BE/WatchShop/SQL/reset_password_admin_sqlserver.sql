-- ============================================
-- ĐẶT LẠI MẬT KHẨU ADMIN = 123456 (SQL Server - watchshop)
-- Chạy khi admin đã có trong bảng users nhưng login không được
-- ============================================

USE watchshop;
GO

-- Hash BCrypt do chính backend sinh (GET /api/dev/bcrypt-hash?password=123456)
UPDATE users
SET password = N'$2a$10$CndHhoRx/cg6G4UriEWgq.N3yEWpOwC2seijkhlGUhNj5hnhpBc82'
WHERE email = N'admin@gmail.com';

IF @@ROWCOUNT > 0
  PRINT N'Đã đặt lại mật khẩu admin@gmail.com thành: 123456';
ELSE
  PRINT N'Không tìm thấy admin@gmail.com trong bảng users.';
GO
