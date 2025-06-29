package com.test.first.dto;

import lombok.Data;

@Data
public class userpassword {

    private String password;


    public userpassword(String password) {
        this.password = password;
    }
}
