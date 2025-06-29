package com.test.first.dto;

import com.test.first.entity.Categorie;
import com.test.first.entity.User;
import lombok.Data;


@Data
public class produitdto {

    private String name;
    private float qte;
    private float price;
    private Categorie categorie;
    private User user;



    public produitdto(String name, float qte, float price, Categorie categorie, User user) {
        this.name = name;
        this.qte = qte;
        this.price = price;
        this.categorie = categorie;
        this.user = user;
    }



}

