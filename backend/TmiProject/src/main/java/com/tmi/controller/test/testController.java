package com.tmi.controller.test;

import java.util.List;

import com.tmi.entity.Test;
import com.tmi.repository.TestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class testController {
    @Autowired
    private TestRepository repository;

    @GetMapping()
    List<Test> all() {
        return repository.findAll();
    }

    @PostMapping()
    Test newTest(@RequestBody Test newTest) {
        return repository.save(newTest);
    }
}
