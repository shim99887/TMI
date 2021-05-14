package com.tmi.service;

import com.tmi.dto.CoveragePostDto;
import com.tmi.entity.Coverage;
import com.tmi.entity.Report;
import com.tmi.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface CoverageService {
    List<Coverage> readAllCoverages();

    List<Coverage> readAllCoveragesInReport(long id);

    Coverage findCoverageById(long id);

    Coverage createCoverage(CoveragePostDto coveragePostDto);
}
