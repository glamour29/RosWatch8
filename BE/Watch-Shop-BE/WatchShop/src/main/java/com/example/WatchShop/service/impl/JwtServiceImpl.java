package com.example.WatchShop.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.WatchShop.model.Users;
import com.example.WatchShop.service.i_service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Service
public class JwtServiceImpl implements JwtService {
    private final String SECRET_KEY = "secret123";
    private final Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY.getBytes());

    public String extractEmail(String token) {
        return decodeJWT(token).getSubject();
    }

    public UUID id(String token) {
        return UUID.fromString(decodeJWT(token)
                .getClaim("id")
                .asString());
    }

    public List<String> extractRoles(String token) {
        return decodeJWT(token)
                .getClaim("roles")
                .asList(String.class);
    }

    public DecodedJWT decodeJWT(String token) {
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }

    public Boolean isValidToken(String token, Users user) {
        return extractEmail(token)
                .equals(user.getEmail()) && !isTokenExpired(token);
    }

    public Boolean isTokenExpired(String token) {
        return decodeJWT(token)
                .getClaim("exp")
                .asDate()
                .before(new Date());
    }

    public String generateToken(Users user, Collection<? extends GrantedAuthority> authorities) {
        return JWT.create()
                .withSubject(user.getEmail())
                .withClaim("id", user.getId())
                .withClaim("name", user.getFullName())
                .withClaim("roles", authorities
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList())
                .withExpiresAt(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .sign(algorithm);
    }

    public String generateRefreshToken(Users user) {
        return JWT.create()
                .withSubject(user.getEmail())
                .withClaim("name", user.getFullName())
                .withExpiresAt(new Date(System.currentTimeMillis() + 5 * 24 * 60 * 60 * 1000))
                .sign(algorithm);
    }


    public String getTokenFromRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        String token = "";
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
            token = authorizationHeader.substring("Bearer".length() + 1);
        }
        return token;
    }
}
