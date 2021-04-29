package com.tmi.tmi.controller;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.tmi.tmi.model.Counter;
import com.tmi.tmi.model.Method;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api")
public class DataXmlController {
	@PostMapping("/data")
	@ApiOperation(value = "postXmlFile")
	public ResponseEntity<String> postXmlFile(MultipartFile xmlFile) {
		if (!xmlFile.isEmpty()) {
			try {

				InputStream is = xmlFile.getInputStream();
				InputStreamReader reader = new InputStreamReader(is);
				Stream<String> streamOfString = new BufferedReader(reader).lines();
				String streamToString = streamOfString.collect(Collectors.joining());
				JSONObject xmlJsonObj = XML.toJSONObject(streamToString);

				JSONObject report = xmlJsonObj.getJSONObject("report");
				JSONArray packageArray = report.getJSONArray("package");

//				package의 counter				
//				for(int i=0; i < packageArray.length(); i++) {
//					JSONObject pkg = packageArray.getJSONObject(i);
//					System.out.println(pkg.get("name"));
//					JSONArray pkgCounter = pkg.getJSONArray("counter");
//					for(int j=0; j < pkgCounter.length(); j++) {
//						System.out.println("type : " + pkgCounter.getJSONObject(j).get("type"));
//						System.out.println("missed : " + pkgCounter.getJSONObject(j).get("missed"));
//						System.out.println("covered : " + pkgCounter.getJSONObject(j).get("covered"));
//					}
//				}

				for (int i = 0; i < packageArray.length(); i++) {
					System.out.println(packageArray.getJSONObject(i).get("name"));
					if (packageArray.getJSONObject(i).optJSONArray("class") == null) {
						JSONObject pkgInnerClass = packageArray.getJSONObject(i).getJSONObject("class");
						System.out.println(pkgInnerClass.get("name"));
						if (pkgInnerClass.has("method")) {
							if (pkgInnerClass.optJSONArray("method") == null) {
								JSONObject classInnerMethod = pkgInnerClass.getJSONObject("method");
								System.out.println("Mehtod : " + classInnerMethod.get("name"));
								JSONArray methodInnerCounter = classInnerMethod.getJSONArray("counter");
								for(int k=0;k<methodInnerCounter.length();k++) {
									Counter counter = new Counter();
									JSONObject mCounter = methodInnerCounter.getJSONObject(k);
									counter.setType(mCounter.get("type").toString());
									counter.setCovered(Integer.parseInt(mCounter.get("covered").toString()));
									counter.setMissed(mCounter.getInt("missed"));
//									System.out.println("Type : " + mCounter.get("type"));
//									System.out.println("missed : " + mCounter.get("missed"));
//									System.out.println("covered : " + mCounter.get("covered"));
									System.out.println(counter);
								}
							} else {
								JSONArray classInnerMethods = pkgInnerClass.getJSONArray("method");
								for (int j = 0; j < classInnerMethods.length(); j++) {
									System.out.println("Mehtod : " + classInnerMethods.getJSONObject(j).get("name"));
									JSONArray methodInnerCounter = classInnerMethods.getJSONObject(j).getJSONArray("counter");
									for(int k=0;k<methodInnerCounter.length();k++) {
										JSONObject mCounter = methodInnerCounter.getJSONObject(k);
										Counter counter = new Counter();
										counter.setType(mCounter.get("type").toString());
										counter.setCovered(Integer.parseInt(mCounter.get("covered").toString()));
										counter.setMissed(Integer.parseInt(mCounter.get("missed").toString()));
										System.out.println(counter);
//										System.out.println("Type : " + mCounter.get("type"));
//										System.out.println("missed : " + mCounter.get("missed"));
//										System.out.println("covered : " + mCounter.get("covered"));
									}
								}
							}
						}
					} else {
						JSONArray pkgInnerClasses = packageArray.getJSONObject(i).getJSONArray("class");
						for (int j = 0; j < pkgInnerClasses.length(); j++) {
							JSONObject pkgInnerClass = pkgInnerClasses.getJSONObject(j);
							System.out.println(pkgInnerClass.get("name"));
							if (pkgInnerClass.has("method")) {

								if (pkgInnerClass.optJSONArray("method") == null) {
									JSONObject classInnerMethod = pkgInnerClass.getJSONObject("method");
									System.out.println("Mehtod : " + classInnerMethod.get("name"));
									JSONArray methodInnerCounter = classInnerMethod.getJSONArray("counter");
									for(int k=0;k<methodInnerCounter.length();k++) {
										JSONObject mCounter = methodInnerCounter.getJSONObject(k);
										Counter counter = new Counter();
										counter.setType(mCounter.get("type").toString());
										counter.setCovered(Integer.parseInt(mCounter.get("covered").toString()));
										counter.setMissed(Integer.parseInt(mCounter.get("missed").toString()));
										System.out.println(counter);
//										System.out.println("Type : " + mCounter.get("type"));
//										System.out.println("missed : " + mCounter.get("missed"));
//										System.out.println("covered : " + mCounter.get("covered"));
									}
								} else {
									JSONArray classInnerMethods = pkgInnerClass.getJSONArray("method");
									for (int k = 0; k < classInnerMethods.length(); k++) {
										System.out.println("Mehtod : " + classInnerMethods.getJSONObject(k).get("name"));
										JSONArray methodInnerCounter = classInnerMethods.getJSONObject(k).getJSONArray("counter");
										for(int m=0;m<methodInnerCounter.length();m++) {
											JSONObject mCounter = methodInnerCounter.getJSONObject(m);
											Counter counter = new Counter();
											counter.setType(mCounter.get("type").toString());
											counter.setCovered(Integer.parseInt(mCounter.get("covered").toString()));
											counter.setMissed(Integer.parseInt(mCounter.get("missed").toString()));
											System.out.println(counter);
//											System.out.println("Type : " + mCounter.get("type"));
//											System.out.println("missed : " + mCounter.get("missed"));
//											System.out.println("covered : " + mCounter.get("covered"));
										}
									}
								}
							}
						}
					}

					System.out.println("────────────────────────────────────");
//					JSONArray pkgInnerClass = packageArray.getJSONObject(i).getJSONArray("class");
//					for(int j=0; j < pkgInnerClass.length(); j++) {
//						System.out.println(pkgInnerClass.getJSONObject(j).get("name"));
//					}
				}

				return new ResponseEntity<String>(xmlJsonObj.toString(), HttpStatus.ACCEPTED);
//				System.out.println(xmlJsonObj.toString());
//				DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//				InputStream is = xmlFile.getInputStream();
//				DocumentBuilder dBuilder = factory.newDocumentBuilder();
//				Document document = dBuilder.parse(is); // 파싱할 xml 파일 위치
//				NodeList reportList = document.getElementsByTagName("report");
//				
//				//프로젝트 이름
////				System.out.println(reportList.item(0).getAttributes().getNamedItem("name").getNodeValue());
//				NodeList packageList = document.getElementsByTagName("package");
////				System.out.println(packageList.item(1).getAttributes().getNamedItem("name").getNodeValue());
//				for(int i=0; i < packageList.getLength();i++) {
////					System.out.println(packageList.item(i));
//					Node node = packageList.item(i);
//					System.out.println(node.getAttributes().getNamedItem("name"));
//					System.out.println(node.getChildNodes().getLength());
//					for(int j=0; j < node.getChildNodes().getLength(); j++) {
//						if(node.getChildNodes().item(j) == null) {
//							continue;
//						}
//						Node classList = node.getChildNodes().item(j);
//						if(classList.hasAttributes()) {
//							System.out.println(classList.toString());
//							
//						}
//					}
//					System.out.println(node.hasChildNodes());
//				}
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
//		return new ResponseEntity<>(true, HttpStatus.OK);
		return null;

	}
}