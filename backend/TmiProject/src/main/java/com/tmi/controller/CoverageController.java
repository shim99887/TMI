package com.tmi.controller;

import com.tmi.entity.Coverage;
import com.tmi.repository.CoverageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/package-coverage")
public class CoverageController {
    @Autowired
    private CoverageRepository repository;

    @GetMapping()
    List<Coverage> all() {
        return repository.findAll();
    }

    @PostMapping()
    Coverage newPackageCoverage(@RequestBody Coverage newPC) {
        return repository.save(newPC);
    }
}
