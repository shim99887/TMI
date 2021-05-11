package com.tmi.controller.report;

import java.util.List;

import com.tmi.dto.ReportPostDto;
import com.tmi.entity.Report;
import com.tmi.service.CoverageService;
import com.tmi.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/report")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping()
    List<Report> allReport() {
        return reportService.readAllReports();
    }

    @GetMapping("/{id}")
    Report oneReport(@PathVariable Long id) {
        return reportService.readOneReport(id);
    }

    @GetMapping("/app/{aid}")
    List<Report> allReportByAppId(@PathVariable String aid) {
        return reportService.readAllReportsInApp(aid);
    }

    @PostMapping()
    Report createReport(@RequestBody ReportPostDto dto) {
        return reportService.createReport(dto);
    }
}
