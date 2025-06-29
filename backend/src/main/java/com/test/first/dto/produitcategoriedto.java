package com.test.first.dto;

import com.test.first.entity.Categorie;
import com.test.first.entity.User;
import lombok.Data;


@Data
public class produitcategoriedto
{
    long number;
    String name;



    public produitcategoriedto(long number, String name) {
        this.number = number;
        this.name = name;
    }
}
