package com.example.WatchShop.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class PasswordUtils {
    public static String generateRandomPassword(int length) {
        final String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
        StringBuilder sb = new StringBuilder();

        try {
            SecureRandom random = SecureRandom.getInstanceStrong();
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            while (sb.length() < length) {
                byte[] randomBytes = new byte[16];
                random.nextBytes(randomBytes);
                byte[] hashBytes = md.digest(randomBytes);

                for (byte b : hashBytes) {
                    if (characters.contains(String.valueOf((char) b))) {
                        sb.append((char) b);

                        if (sb.length() == length) {
                            break;
                        }
                    }
                }
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }

        return sb.toString();
    }
}
