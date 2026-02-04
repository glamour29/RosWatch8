package com.example.WatchShop.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateBcryptHash {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "123456";
        String hash = encoder.encode(password);
        System.out.println("Mật khẩu: " + password);
        System.out.println("Hash BCrypt (copy vào SQL):");
        System.out.println(hash);
        System.out.println("\nSQL: UPDATE users SET password = N'" + hash + "' WHERE email = N'admin@gmail.com';");
    }
}
