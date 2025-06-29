package com.test.first.controller;

import com.test.first.dto.produitcategoriedto;
import com.test.first.dto.produitdto;
import com.test.first.entity.Produit;
import com.test.first.entity.User;
import com.test.first.entity.Categorie;
import com.test.first.repository.ProduitRepository;
import com.test.first.repository.UserRepository;
import com.test.first.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/produits")
public class produitController {

    @Autowired
    private ProduitRepository produitRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategorieRepository categorieRepository;

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> createProduit(@RequestBody Produit produit) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();


        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Set the user
        produit.setUser(user);

        // Check if categorie is provided
        if (produit.getCategorie() == null) {
            return ResponseEntity.badRequest().body("Category is required");
        }

        // Validate that the category exists
        if (produit.getCategorie().getIdCat() == null) {
            return ResponseEntity.badRequest().body("Category ID is required");
        }

        Categorie existingCategorie = categorieRepository.findById(produit.getCategorie().getIdCat()).orElse(null);
        if (existingCategorie == null) {
            return ResponseEntity.badRequest().body("Category with ID " + produit.getCategorie().getIdCat() + " does not exist");
        }

        // Set the validated category
        produit.setCategorie(existingCategorie);

        Produit savedProduit = produitRepository.save(produit);
        return ResponseEntity.ok(savedProduit);
    }

    @PostMapping("/add-dto")
    public ResponseEntity<?> createProduitWithDto(@RequestBody produitdto produitDto) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();


        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Create a new Produit from the DTO
        Produit produit = new Produit();
        if( produitDto.getName() == null || produitDto.getName().isEmpty() || produitRepository.findByUserName(produitDto.getName(),user.getIdUse())!=null  ) {
            return ResponseEntity.badRequest().body("Name existe");
        }
        produit.setName(produitDto.getName());
        produit.setQte(produitDto.getQte());
        produit.setPrice(produitDto.getPrice());
        produit.setUser(user);

        // Check if categorie is provided
        if (produitDto.getCategorie() == null) {
            return ResponseEntity.badRequest().body("Category is required");
        }

        // Validate that the category exists
        if (produitDto.getCategorie().getIdCat() == null) {
            return ResponseEntity.badRequest().body("Category ID is required");
        }

        Categorie existingCategorie = categorieRepository.findById(produitDto.getCategorie().getIdCat()).orElse(null);
        if (existingCategorie == null) {
            return ResponseEntity.badRequest().body("Category with ID " + produitDto.getCategorie().getIdCat() + " does not exist");
        }

        // Set the validated category
        produit.setCategorie(existingCategorie);

        Produit savedProduit = produitRepository.save(produit);
        return ResponseEntity.ok(savedProduit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Produit existingProduit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit not found"));

        if (!existingProduit.getUser().getIdUse().equals(user.getIdUse())) {
            return ResponseEntity.badRequest().body("You are not authorized to update this product");
        }

        produit.setIdPro(id);
        produit.setUser(user);
        Produit updatedProduit = produitRepository.save(produit);
        return ResponseEntity.ok(updatedProduit);
    }

    @DeleteMapping("/del/{id}")
    public ResponseEntity<?> deleteProduit(@PathVariable Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();


        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit not found"));

        if (!produit.getUser().getIdUse().equals(user.getIdUse())) {
            return ResponseEntity.badRequest().body("You are not authorized to delete this product");
        }

        produitRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserProduits() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Produit> userProduits = produitRepository.findByUser(user);
        return ResponseEntity.ok(userProduits);
    }

    @GetMapping("/{name}")
    public Produit[] getUserByName(@PathVariable String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return produitRepository.findByUserproduit(user.getIdUse(), name);
    }

    @GetMapping("/categorie/{name}")
    public Produit[] getProduitByCategorieName(@PathVariable String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return produitRepository.findByUsercategorie(user.getIdUse(), name);
    }
    @DeleteMapping("/cat")
    public ResponseEntity<?> findBycat() {
       produitRepository.deleteBycategorie();
       return ResponseEntity.ok().body("test");
    }
    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateProduit(@RequestBody Produit produit, @PathVariable long id) {
        Produit mainproduit = produitRepository.findById(id).get();
        mainproduit.setName(produit.getName());
        mainproduit.setPrice(produit.getPrice());
        mainproduit.setCategorie(produit.getCategorie());
        mainproduit.setQte(produit.getQte());

        produitRepository.save(mainproduit);
        return ResponseEntity.ok(mainproduit);
    }

}
