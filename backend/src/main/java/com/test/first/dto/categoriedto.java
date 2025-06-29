package com.test.first.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.test.first.entity.Produit;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Data
public class categoriedto {
    private String name;
    public categoriedto(String name) {
        this.name = name;
    }
}
