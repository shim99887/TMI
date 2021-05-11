package com.tmi.controller.report;

import java.util.List;

import com.tmi.controller.app.AppNotFoundException;
import com.tmi.entity.Report;
import com.tmi.repository.ReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    private ReportRepository repository;

    @GetMapping()
    List<Report> all() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    Report getReport(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new ReportNotFoundException(id));
    }

    @GetMapping("/app/{aid}")
    List<Report> getReportListByAppId(@PathVariable Long aid) {
        return repository.findAllByApp_Id(aid);
    }

    @PostMapping()
    Report newTest(@RequestBody Report newReport) {
        return repository.save(newReport);
    }
}
