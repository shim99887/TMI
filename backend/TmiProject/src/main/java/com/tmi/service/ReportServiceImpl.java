package com.tmi.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.tmi.dto.ReportPostDto;
import com.tmi.entity.App;
import com.tmi.entity.Report;
import com.tmi.repository.AppRepository;
import com.tmi.repository.ReportRepository;

@Service
public class ReportServiceImpl implements ReportService{
    @Autowired
    private AppRepository appRepository;

    @Autowired
    private ReportRepository reportRepository;

    public List<Report> getAllReport() {
        return reportRepository.findAllByOrderByIdDesc();
    }

    public Report findReportById(long id) {
        if(reportRepository.findById(id).isPresent()){
            return reportRepository.findById(id).get();
        }
        return null;
    }

    public List<Report> readAllReportsInApp(String aid) {
        return reportRepository.findAllByAppIdOrderByIdDesc(aid);
    }

    public Report createReport(Report report, String appId) {
        App app = appRepository.findById(appId).get();
        System.out.println(app);
        report.setApp(app);
        return null;
//        return reportRepository.save(report);
    }
}
