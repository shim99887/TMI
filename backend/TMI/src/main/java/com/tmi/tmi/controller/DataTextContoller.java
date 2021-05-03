package com.tmi.tmi.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tmi.tmi.model.Test;
import com.tmi.tmi.repository.TestRepository;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
public class DataTextContoller {
	
	@Autowired
	TestRepository testRepository;
	
	@PostMapping("/junit/data")
	@ApiOperation(value = "postTxtFile")
	public ResponseEntity<Boolean> postTxtFile(List<MultipartFile> txtFiles) {
		if (!txtFiles.isEmpty()) {
			try {
				Date date_now = new Date(System.currentTimeMillis());
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String buildTime = sdf.format(date_now);
				for (MultipartFile txtFile : txtFiles) {
					Test test = new Test();
					test.setBuildTime(buildTime);
					
					// String content = new String(txtFile.getBytes());
					File file = convert(txtFile);
					FileReader fr = new FileReader(file);
					BufferedReader br = new BufferedReader(fr);
					String line = "";
					int lineCount = 0;
					while ((line = br.readLine()) != null) {
						String [] splitStr;
						if(lineCount == 1) {
							splitStr = line.split(":");
							test.setPackage_name(splitStr[1].trim());
							//System.out.println(splitStr[1].trim());
						}else if(lineCount == 3) {
							splitStr = line.split(",");
							for(int i=0;i<splitStr.length;i++) {
								switch(i) {
								case 0:
									test.setRunCount(Integer.parseInt(splitStr[i].replace("Tests","").split("-")[0].trim().split(":")[1].replace("s","").trim()));
									break;
								case 1:
									test.setFailCount(Integer.parseInt(splitStr[i].replace("Tests","").split("-")[0].trim().split(":")[1].replace("s","").trim()));
									break;
								case 2:
									test.setErrorCount(Integer.parseInt(splitStr[i].replace("Tests","").split("-")[0].trim().split(":")[1].replace("s","").trim()));
									break;
								case 3:
									test.setSkipCount(Integer.parseInt(splitStr[i].replace("Tests","").split("-")[0].trim().split(":")[1].replace("s","").trim()));
									break;
								case 4:
									test.setElapsedTime(Float.parseFloat(splitStr[i].replace("Tests","").split("-")[0].trim().split(":")[1].replace("s","").trim()));
									break;
								}
								//System.out.println(splitStr[i].replace("Tests","").split("-")[0].trim().split(":")[1].replace("s","").trim());
//								System.out.println(splitStr[i].trim());
							}
						}
						//System.out.println(lineCount + ", " + line);
						lineCount++;
					}

					br.close();
					// System.out.println(content);
					testRepository.save(test);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			// 받아졌다면
			return new ResponseEntity<>(true, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(false, HttpStatus.OK);
		}
	}

	public File convert(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		convFile.createNewFile();
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}
}
