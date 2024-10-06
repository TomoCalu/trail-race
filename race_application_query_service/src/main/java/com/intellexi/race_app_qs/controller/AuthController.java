package com.intellexi.race_app_qs.controller;

import com.intellexi.race_app_qs.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/me")
    public Map<String, Object> getAuthenticatedUser() {
        return authService.getAuthenticatedUserDetails();
    }
}
