package com.tmi.controller;

import com.tmi.dto.coverage.CoveragePostDto;
import com.tmi.entity.Coverage;
import com.tmi.service.CoverageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/coverage")
public class CoverageController {
    @Autowired
    private CoverageService coverageService;

    @GetMapping
    List<Coverage> all() {
        return coverageService.readAllCoverages();
    }

//    @GetMapping("/{id}")
//    List<Coverage> allInReport(@PathVariable long id) {
//        return coverageService.readAllCoveragesInReport(id);
//    }

    @PostMapping
    Coverage createCoverage(@RequestBody CoveragePostDto dto) {
        return coverageService.createCoverage(dto);
    }
}
