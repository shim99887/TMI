package com.tmi.controller;

import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/coverage")
public class CoverageController {
//    @Autowired
//    private CoverageService coverageService;
//
//
//    @GetMapping
//    List<Coverage> all() {
//        return coverageService.readAllCoverages();
//    }
//
////    @GetMapping("/{id}")
////    List<Coverage> allInReport(@PathVariable long id) {
////        return coverageService.readAllCoveragesInReport(id);
////    }
//
//    @GetMapping("/report/{id}")
//    List<Coverage> getCoverageListByReportId(@PathVariable Long id) {
//        return coverageService.readAllCoveragesInReport(id);
//    }
//
//    @PostMapping
//    Coverage createCoverage(@RequestBody CoveragePostDto dto) {
//        return coverageService.createCoverage(dto);
//    }
}
