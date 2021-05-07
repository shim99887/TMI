package com.tmi.controller;

import com.tmi.dto.coverage.CoveragePostDto;
import com.tmi.entity.Coverage;
import com.tmi.repository.CoverageRepository;
import com.tmi.service.CoverageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/package-coverage")
public class CoverageController {
    @Autowired
    private CoverageService coverageService;

    @GetMapping
    List<Coverage> all() {
        return coverageService.readAllCoverages();
    }

    @PostMapping
    Coverage createCoverage(@RequestBody CoveragePostDto dto) {
        return coverageService.createCoverage(dto);
    }
}
