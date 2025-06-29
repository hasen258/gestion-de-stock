package com.test.first.dto;


import lombok.Data;

@Data
public class username {

    private String name;


    public username(String name) {
        this.name = name;
    }


}
