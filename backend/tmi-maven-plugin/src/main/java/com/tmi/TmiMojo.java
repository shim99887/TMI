package com.tmi;

import java.io.File;
import java.io.FileInputStream;
import java.io.FilenameFilter;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.apache.maven.model.Build;
import org.apache.maven.model.Dependency;
import org.apache.maven.model.Model;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.apache.maven.project.MavenProject;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.ResourceHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Mojo(name = "tmi-dependency", defaultPhase = LifecyclePhase.PACKAGE)
public class TmiMojo extends AbstractMojo {
	@Parameter(defaultValue = "${project}", required = true, readonly = true)
	MavenProject project;
	private Model model;
	private Build build;
	private File targetDir;

	public void execute() throws MojoExecutionException {
		List<Dependency> dependencies = project.getDependencies();
		long numDependencies = dependencies.stream().count();
		getLog().info("Number of dependencies: " + numDependencies);

		this.model = project.getModel();
		this.build = model.getBuild();
		this.targetDir = new File(build.getDirectory());

		File dir = new File(targetDir + "/surefire-reports/");

		FilenameFilter filter = new FilenameFilter() {
			public boolean accept(File f, String name) {
				return name.endsWith("txt");
			}
		};
		File[] junitFileTextArr = dir.listFiles(filter);
		// List<File> junitXmlFileList = new ArrayList<>();
		File jacocoXmlFile = new File(targetDir + "/site/jacoco/jacoco.xml");
		//File file = new File("/path/to/file");
		FileItem fileItem = null;
		try {
			fileItem = new DiskFileItem("mainFile", Files.probeContentType(jacocoXmlFile.toPath()), false, jacocoXmlFile.getName(), (int) jacocoXmlFile.length(), jacocoXmlFile.getParentFile());

		    InputStream input = new FileInputStream(jacocoXmlFile);
		    //OutputStream os = fileItem.getOutputStream();
		    //IOUtils.copy(input, os);
		    // Or faster..
		     IOUtils.copy(input, fileItem.getOutputStream());
		} catch (Exception e) {
		    e.printStackTrace();
		}

		MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
		
		
		for (int i = 0; i < junitFileTextArr.length; i++) {
			getLog().info("junit xml file name " + junitFileTextArr[i].getName());
		}
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.MULTIPART_FORM_DATA);
		
		//jacoco xml 파일 전송
		
		
		HttpMessageConverter<Object> jackson = new MappingJackson2HttpMessageConverter();
		HttpMessageConverter<Resource> resource = new ResourceHttpMessageConverter();
		FormHttpMessageConverter formHttpMessageConverter = new FormHttpMessageConverter();
		formHttpMessageConverter.addPartConverter(jackson);
		formHttpMessageConverter.addPartConverter(resource); 

		RestTemplate restTemplate = new RestTemplate(Arrays.asList(jackson, resource, formHttpMessageConverter));
		
		MultiValueMap<String, Object> jacocoXmlBody = new LinkedMultiValueMap<>();
		jacocoXmlBody.add("xmlFile", multipartFile.getResource());
		HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(jacocoXmlBody, headers);
		String serverUrl = "http://localhost:8080/api/data";
		//RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> jacocoResponse = restTemplate.exchange(serverUrl, HttpMethod.POST, requestEntity, String.class);
		getLog().info("jacoco xml response code: " + jacocoResponse.getStatusCode());
		
		MultiValueMap<String, Object> junitTxtBody = new LinkedMultiValueMap<>();
		//List<Resource> junitTxtResourceList = new ArrayList<>();
		for (int i = 0; i < junitFileTextArr.length; i++) {
			FileItem txtFileItem = null;
			try {
				txtFileItem = new DiskFileItem("mainFile", Files.probeContentType(junitFileTextArr[i].toPath()), false, junitFileTextArr[i].getName(), (int) junitFileTextArr[i].length(), junitFileTextArr[i].getParentFile());

			    InputStream input = new FileInputStream(junitFileTextArr[i]);
			    //IOUtils.copy(input, os);
			    // Or faster..
			     IOUtils.copy(input, txtFileItem.getOutputStream());
			} catch (Exception e) {
			    e.printStackTrace();
			}
			multipartFile = new CommonsMultipartFile(txtFileItem);
			junitTxtBody.add("txtFiles", multipartFile.getResource());
			//junitTxtResourceList.add(multipartFile.getResource());
		}
		
		
		restTemplate = new RestTemplate(Arrays.asList(jackson, resource, formHttpMessageConverter));
		requestEntity = new HttpEntity<>(junitTxtBody, headers);
		String junitServerUrl = "http://localhost:8080/api/junit/data";
		ResponseEntity<Boolean> junitResponse = restTemplate.exchange(junitServerUrl, HttpMethod.POST, requestEntity, Boolean.class);
		
		getLog().info("junit txt response code: " + junitResponse.getStatusCode());
	}
}
