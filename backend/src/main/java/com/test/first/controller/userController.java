package com.test.first.controller;


import com.test.first.dto.categoriedto;
import com.test.first.dto.createuser;
import com.test.first.dto.produitcategoriedto;
import com.test.first.dto.userdto;
import com.test.first.entity.Categorie;
import com.test.first.entity.Produit;
import jakarta.validation.Valid;
import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.test.first.entity.User;
import com.test.first.repository.UserRepository;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;





@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class userController {

    @Autowired
    private UserRepository userRepository;




    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @PostMapping("/add")
    public User addUser(@Valid @RequestBody createuser user) {
        if (user.getEmail() == null || !user.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email invalide");
        }
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());

        return userRepository.save(newUser);
    }

    @GetMapping("/{name}")
    public userdto getUserByName(@PathVariable String name) {
        if (userRepository.existsByName(name)) {
            return userRepository.findByName(name);
        }
        else {
            return null;
        }
    }
    @DeleteMapping("/del/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
    @GetMapping("/auth")
    public userdto getUserByEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        if (user != null) {
            return new userdto(user.getName(), user.getEmail(),user.getPathimage());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
    @GetMapping("/numProduit")
    public int getUserNumProduit() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        if (user != null) {
            return userRepository.numPro(user.getIdUse());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }
    @GetMapping("/numCategorie")
    public int getUsernumCategorie() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        if (user != null) {
            return userRepository.numCat(user.getIdUse());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @GetMapping("/count")
    public List<produitcategoriedto> countProduit() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        return userRepository.GroupProduitCat(user.getIdUse());
    }
    @PostMapping("/pathimage")
    public ResponseEntity<String> updateUserImage(@RequestBody userdto userimage) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user.setPathimage(userimage.getPathimage());
        userRepository.save(user);

        return ResponseEntity.ok("Image updated successfully");
    }




}
