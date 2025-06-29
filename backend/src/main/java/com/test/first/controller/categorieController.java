package com.test.first.controller;

import com.test.first.dto.categoriedto;
import com.test.first.entity.Categorie;
import com.test.first.entity.Produit;
import com.test.first.entity.User;
import com.test.first.repository.CategorieRepository;
import com.test.first.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class categorieController {

    private final CategorieRepository categorieRepository;
    private final UserRepository userRepository;

    @GetMapping("/user")
    public Categorie[] getUserCategorie() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Categorie> userCategorie = List.of(categorieRepository.findCategorieByIdUse(user.getIdUse()));
        return userCategorie.toArray(new Categorie[0]);
    }

    @GetMapping
    public Iterable<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    @DeleteMapping("/del/{idCat}")
    public boolean deleteCategorieById(@PathVariable Long idCat) {
        if (categorieRepository.existsById(idCat)) {
            categorieRepository.deleteById(idCat);
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/add")
    public boolean addCategorie(@RequestBody categoriedto categorie) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        User user = userRepository.findByEmail(userEmail);
        if(categorie.getName() == null || categorie.getName().isEmpty() || categorieRepository.existsByName(categorie.getName(),user.getIdUse())!=0 ) {
            return false;
        }

        else{

            if (user == null) {
                return false;
            }
            Categorie cat = new Categorie();
            cat.setName(categorie.getName());
            cat.setUser(user);
            categorieRepository.save(cat);
            return true;
        }
    }

    @PatchMapping("update/{id}")
    public boolean updateCategorie(@PathVariable Long id, @RequestBody Categorie categorie) {
        Categorie cat = categorieRepository.findById(id).get();
        cat.setName(categorie.getName());
        categorieRepository.save(cat);
        return true;

    }


}
