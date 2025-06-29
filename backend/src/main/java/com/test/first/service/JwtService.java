package com.test.first.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String SECRET_KEY = "your-key";

    public String extractUsername(String token) {
        try {
            String username = extractClaim(token, Claims::getSubject);
            System.out.println("Extracted username from token: " + username);
            return username;
        } catch (Exception e) {
            System.out.println("Error extracting username: " + e.getMessage());
            throw e;
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        try {
            final Claims claims = extractAllClaims(token);
            return claimsResolver.apply(claims);
        } catch (Exception e) {
            System.out.println("Error extracting claim: " + e.getMessage());
            throw e;
        }
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        String token = Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
        System.out.println("Generated token for user: " + userDetails.getUsername());
        return token;
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUsername(token);
            boolean isValid = (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
            System.out.println("Token validation result: " + isValid);
            System.out.println("Username from token: " + username);
            System.out.println("Username from userDetails: " + userDetails.getUsername());
            return isValid;
        } catch (Exception e) {
            System.out.println("Error validating token: " + e.getMessage());
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            boolean isExpired = extractExpiration(token).before(new Date());
            System.out.println("Token expiration check: " + isExpired);
            return isExpired;
        } catch (Exception e) {
            System.out.println("Error checking token expiration: " + e.getMessage());
            return true;
        }
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            System.out.println("Error extracting claims: " + e.getMessage());
            throw e;
        }
    }

    private Key getSignInKey() {
        byte[] keyBytes = java.util.Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
} 