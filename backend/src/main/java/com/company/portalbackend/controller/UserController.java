package com.company.portalbackend.controller;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @GetMapping("/authenticated/hello")
    public String authenticatedHello() {
        return "authenticated-hello";
    }

    @GetMapping("/anonymous/hi")
    public String anonymousHello() {
        return "anonymous-hi";
    }
}