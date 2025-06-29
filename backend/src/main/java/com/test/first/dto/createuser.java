package com.test.first.dto;

import lombok.Data;

@Data
public class createuser {
    private String name;
    private String email;
    private String password;


    public createuser(String name, String password,String email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}
