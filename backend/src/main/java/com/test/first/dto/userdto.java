package com.test.first.dto;


import lombok.Data;

@Data
public class userdto {

    private String name;
    private String email;
    private String pathimage;


    public userdto(String name,String email, String pathimage) {
        this.name = name;
        this.email = email;
        this.pathimage = pathimage;
    }


}
