package com.example.WatchShop.service.i_service;

import com.example.WatchShop.model.Users;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public interface JwtService {
    public String getTokenFromRequest(HttpServletRequest request);

    public String extractEmail(String token);

    public String generateRefreshToken(Users user);

    public String generateToken(Users user, Collection<? extends GrantedAuthority> authorities);
}
