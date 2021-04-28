package com.tmi.tmi.controller;

import java.io.InputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
public class DataXmlController {
	@PostMapping("/data")
	@ApiOperation(value = "postXmlFile")
	public ResponseEntity<Boolean> postXmlFile(MultipartFile xmlFile) {
		if (!xmlFile.isEmpty()) {
			try {
				DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
				InputStream is = xmlFile.getInputStream();
				DocumentBuilder dBuilder = factory.newDocumentBuilder();
				Document document = dBuilder.parse(is); // 파싱할 xml 파일 위치
				NodeList reportList = document.getElementsByTagName("report");
				
				//프로젝트 이름
				System.out.println(reportList.item(0).getAttributes().getNamedItem("name").getNodeValue());
				
				//
//				NodeList list = document.getElementsByTagName("package");
//				List<Coverage> cList = new ArrayList<>();
//	
//				for(int i=0 ; i<list.getLength() ; i++) {
//					Node package_item = list.item(i);
//					NodeList childList = package_item.getChildNodes();
//					Coverage coverageData = new Coverage();
//	
//					for(int k=0 ; k<childList.getLength() ; k++) {
//						Node item = childList.item(k);
//						String value = item.getNodeName();
//						if(value.equals("#text")) continue;
//						if(value.equals("father")) continue;//f.setFather(item.getTextContent());
//						if(value.equals("mother")) continue;//f.setMother(item.getTextContent());
//						if(value.equals("me")) continue;//f.setMe(item.getTextContent());
//					}
//					//cList.add(f);
//				}

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		// 받아졌다면
		return new ResponseEntity<>(true, HttpStatus.OK);

	}
}