package com.tmi.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tmi.entity.App;
import com.tmi.entity.Report;
import com.tmi.raw.entity.CoverageRawData;
import com.tmi.raw.entity.TestRawData;
import com.tmi.raw.repository.CoverageRawDataRepository;
import com.tmi.raw.repository.TestRawDataRepository;
import com.tmi.repository.AppRepository;
import com.tmi.repository.ReportRepository;

@Service
public class DataCollectService {
	@Autowired
	CoverageRawDataRepository coverageRawDataRepository;
	@Autowired
	TestRawDataRepository testRawDataRepository;
	@Autowired
	ReportRepository reportRepository;
	@Autowired
	AppRepository appRepository;
	
	
	public Optional<CoverageRawData> getCoverageData(String id) {
		return coverageRawDataRepository.findById(id);
	}
	
	public Optional<TestRawData> getTestData(String id) {
		return testRawDataRepository.findById(id);
	}
	
	public Optional<App> getAppData(String gitUrl, String projectName) {
		return appRepository.findById(gitUrl + "_" + projectName);
	}
	
	public String dataCollect(String projectName, String gitUrl, String buildTime, String coverageKey, String [] testKeys) {
		Optional<App> appData = getAppData(gitUrl, projectName);
//		if(appData.get() == null) {
//			return "This is not registered app.";
//		}
		//String appId = appData.get().getId();
		
		
		//빌드 시간 가져오기
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime datetime = LocalDateTime.parse(buildTime, formatter);
        
        CoverageRawData coverageRawData = getCoverageData(coverageKey).get();
        int totalLineCovCovered = coverageRawData.getLine().getCovered();
        int totalLineCovMissed = coverageRawData.getLine().getMissed();
        int totalBranchCovCovered = coverageRawData.getBranch().getCovered();
        int totalBranchCovMissed = coverageRawData.getBranch().getMissed();
        
        Report report = new Report(datetime, totalLineCovMissed, totalLineCovCovered, totalBranchCovMissed, totalBranchCovCovered, 0, 0, 0, 0, 0);
		
		report.setApp(appData.get());
		
		Long reportId = reportRepository.save(report).getId();
		
		System.out.println(reportId);
		
		return "success";
	}
	
}
