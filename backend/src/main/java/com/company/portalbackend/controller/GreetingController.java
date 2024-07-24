package com.company.portalbackend.controller;

import com.company.portalbackend.entity.User;
import io.jmix.core.DataManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rest/user")
public class GreetingController {
    @Autowired
    DataManager dataManager;
    @GetMapping("/hello")
    public String authenticatedHello() {

        List<User> loadAll = dataManager.load(User.class).all().list();



        return "authenticated-hello";
    }

    @GetMapping("/anonymous/hi")
    public String anonymousHello() {
        return "anonymous-hi";
    }
    @GetMapping("/all")
    public String loadAll(){
        return "hello";
    }
}
