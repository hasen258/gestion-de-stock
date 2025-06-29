package com.test.first.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCat")
    private Long idCat;

    private String name;
    public Categorie() {
    }
    public Categorie(String name) {
        this.name = name;
    }


    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "idCat")
    private List<Produit> produits;

    @ManyToOne
    @JoinColumn(name = "idUse")
    private User user;
}
