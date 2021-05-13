package com.tmi.controller.file;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.zeroturnaround.zip.ZipUtil;

import com.tmi.repository.AppRepository;
import com.tmi.repository.ReportRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/file")
public class CoverageFileController {
	@Value("${spring.file.location}")
	private String storagePath;
	@Autowired
	AppRepository appRepository;
	@Autowired
	ReportRepository reportRepository;
	
	@PostMapping
	ResponseEntity<Boolean> coverageFileSave(String projectName, String gitUrl, String buildTime, MultipartFile zipFile) {
		
		String appId = appRepository.findApp(projectName, gitUrl).getId();
		
		String filePath = storagePath + "/" + appId + "/" + buildTime.replace(":", "") + "/";
		
		zipFile.getOriginalFilename();
		File file = new File(filePath + zipFile.getOriginalFilename());
		
		if(file.getParentFile().mkdirs()) {
			try {
				// 물리파일 생성
				file.createNewFile();
			}
			catch(IOException ie) {
				// 파일 생성 중 오류
				ie.printStackTrace();
				return ResponseEntity.status(HttpStatus.CONFLICT).build();
			}			
		}
			
		try {
			// 업로드 임시파일 -> 물리파일 덮어쓰기
			zipFile.transferTo(file);
		}
		catch(IOException ie) {
			// 덮어쓰기 중 오류
			ie.printStackTrace();
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}
		
		ZipUtil.unpack(file, new File(storagePath + "/" + appId + "/" + buildTime.replace(":", "") + "/"));
		
		file.delete();
		
		return ResponseEntity.status(HttpStatus.OK).build();	
	}
}
