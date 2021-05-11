package com.tmi.service;

import com.tmi.dto.ReportPostDto;
import com.tmi.entity.App;
import com.tmi.entity.Report;
import com.tmi.repository.AppRepository;
import com.tmi.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReportService {
    @Autowired
    private AppRepository appRepository;

    @Autowired
    private ReportRepository reportRepository;

    public List<Report> readAllReports() {
        return reportRepository.findAllByOrderByIdDesc();
    }

    public Report readOneReport(long id) {
        Report report = reportRepository.findById(id).get();
        return report;
    }

    public List<Report> readAllReportsInApp(long aid) {
        // , Sort.by(Sort.Direction.DESC, "aid")
        App app = appRepository.findById(aid).get();
        List<Report> reports = app.getReports();
        reports = reports.stream().sorted(Comparator.comparing(Report::getId).reversed()).collect(Collectors.toList());
        return reports;
    }

    public Report createReport(ReportPostDto reportPostDto) {
        Optional<App> app = appRepository.findById(reportPostDto.getAppId());
        Report report = reportPostDto.toEntity();
        report.setApp(app.get());

        return reportRepository.save(report);
    }
}
