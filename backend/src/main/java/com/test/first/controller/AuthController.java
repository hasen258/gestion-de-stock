package com.test.first.controller;

import com.test.first.dto.username;
import com.test.first.dto.userpassword;
import com.test.first.entity.User;
import com.test.first.repository.UserRepository;
import com.test.first.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @GetMapping("/verif")
    public boolean verifAuth() {
        return true;
    }
    @PatchMapping("/modPass")
    public ResponseEntity<?> modPass(@Valid @RequestBody userpassword usermod) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        user.setPassword(usermod.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PatchMapping("/modName")
    public ResponseEntity<?> modName(@Valid @RequestBody username usermod) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        user.setName(usermod.getName());
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        System.out.println("Registering user with email: " + user.getEmail());
        
        if (userRepository.findByEmail(user.getEmail()) != null) {
            System.out.println("Email already exists: " + user.getEmail());
            return ResponseEntity.badRequest().body("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        System.out.println("User registered successfully: " + user.getEmail());
        
        String token = jwtService.generateToken(user);
        System.out.println("Generated token for new user: " + token);
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        System.out.println("Login attempt for email: " + loginRequest.getEmail());

        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );
            System.out.println("Authentication successful for: " + loginRequest.getEmail());

            var user = userRepository.findByEmail(loginRequest.getEmail());
            if (user == null) {
                throw new RuntimeException("User not found");
            }
            System.out.println("User found in database: " + user.getEmail());
            
            String token = jwtService.generateToken(user);
            System.out.println("Generated token for login: " + token);
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }
} 