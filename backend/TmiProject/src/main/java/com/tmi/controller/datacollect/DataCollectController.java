package com.tmi.controller.datacollect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tmi.service.DataCollectService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class DataCollectController {
	
	@Autowired
	DataCollectService dataCollectService;
	
	@PostMapping("/data")
	@ApiOperation("MongoDB 데이터 가져와서 저장하기")
	boolean dataCollect(String projectName, String gitUrl, String buildTime, String coverageKey, String [] testKeys) {
//		System.out.println(projectName);
//		System.out.println(gitUrl);
//		System.out.println(buildTime);
//		System.out.println(dataCollectService.getCoverageData(coverageKey));
//		
//		for(int i=0;i<testKeys.length;i++) {
//			System.out.println(dataCollectService.getTestData(testKeys[i]));
//		}
		System.out.println(dataCollectService.dataCollect(projectName, gitUrl, buildTime, coverageKey, testKeys));
		
		
		return true;
	}
}
