package com.tmi.controller.report;

import java.util.List;

import com.tmi.entity.Report;
import com.tmi.repository.ReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/report")
public class reportController {
    @Autowired
    private ReportRepository repository;

    @GetMapping()
    List<Report> all() {
        return repository.findAll();
    }

    @PostMapping()
    Report newTest(@RequestBody Report newReport) {
        return repository.save(newReport);
    }
}
