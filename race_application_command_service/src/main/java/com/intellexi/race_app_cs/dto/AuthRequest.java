package com.intellexi.race_app_cs.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}