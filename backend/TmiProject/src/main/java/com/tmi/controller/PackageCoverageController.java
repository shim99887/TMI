package com.tmi.controller;

import com.tmi.entity.PackageCoverage;
import com.tmi.repository.PackageCoverageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/package-coverage")
public class PackageCoverageController {
    @Autowired
    private PackageCoverageRepository repository;

    @GetMapping()
    List<PackageCoverage> all() {
        return repository.findAll();
    }

    @PostMapping()
    PackageCoverage newPackageCoverage(@RequestBody PackageCoverage newPC) {
        return repository.save(newPC);
    }
}
