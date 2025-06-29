package com.test.first.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Entity
public class Produit {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long idPro;

        private String name;
        private float qte;
        private float price;
        // Constructors
        public Produit() {
        }
        public Produit(String name, float qte, float price, LocalDate dat_create, LocalDate dat_update) {
            this.name = name;
            this.qte = qte;
            this.price = price;
        }
    @ManyToOne
    @JoinColumn(name = "idCat")
    private Categorie categorie;
    @ManyToOne
    @JoinColumn(name = "idUse")
    private User user;


    }
