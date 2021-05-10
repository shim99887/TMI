package com.tmi.tmi.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
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
public class DataTestContoller {
	
	@Autowired
	TestRepository testRepository;
	
	@PostMapping("/junit/data")
	@ApiOperation(value = "postTxtFile")
	public ResponseEntity<Boolean> postTxtFile(String projectName, String gitUrl, List<MultipartFile> txtFiles, MultipartFile htmlFile) {
		if (!txtFiles.isEmpty() && !htmlFile.isEmpty()) {
			try {
				Date date_now = new Date(System.currentTimeMillis());
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.KOREA);
				sdf.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));
				String buildTime = sdf.format(date_now);
				for (MultipartFile txtFile : txtFiles) {
					Test test = new Test();
					test.setBuildTime(buildTime);
					test.setGitUrl(gitUrl);
					test.setProjectName(projectName);
					test.setTestCaseList(new ArrayList<>());
					File file = convert(txtFile);
					FileReader fr = new FileReader(file);
					BufferedReader br = new BufferedReader(fr);
					String line = "";
					int lineCount = 0;
					while ((line = br.readLine()) != null) {
						String [] splitStr;
						if(lineCount == 1) {
							splitStr = line.split(":");
							String packageName = splitStr[1].trim();
							test.setPackageName(packageName);
							String [] tempSplitStr = packageName.split("[.]");
							test.setPackageShortName(tempSplitStr[tempSplitStr.length-1]);

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
									test.setElapsedTime(Float.parseFloat(splitStr[i].replace("Tests","").split("-")[0].trim().split("<<<")[0].trim().split(":")[1].replace("s","").trim()));
									break;
								}
								//System.out.println(splitStr[i].replace("Tests","").split("-")[0].trim().split(":")[1].replace("s","").trim());
//								System.out.println(splitStr[i].trim());
							}
						}else if(lineCount == 4) {
							break;
						}
						//System.out.println(lineCount + ", " + line);
						lineCount++;
					}

					br.close();
					// System.out.println(content);
					testRepository.save(test);
				}

				//html 파일 처리
				File file = convert(htmlFile);
				//File file = new File("./surefire-report.html");
				Document doc = Jsoup.parse(file, "UTF-8");
				Elements div = doc.select("div.section");
//            System.out.println(div);
				int index = 0;
				for(int i=0; i < div.size(); i++){
					if(div.get(i).select("h2").text().equals("Test Cases")){
						index = i;
						break;
					}
				}

				for(int i=index; i < div.size(); i++){
					//class
					if(div.get(i).select("h2").hasText()){
						System.out.println(div.get(i).select("h2").text());
					}
					System.out.println(div.get(i).select("h3").text());
					Elements classes = div.get(i).select("td");
					for(int j=0; j < classes.size(); j++){
						if(classes.get(j).select("td").hasText()){
							System.out.println(classes.get(j).select("td").text());
						}
					}
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
