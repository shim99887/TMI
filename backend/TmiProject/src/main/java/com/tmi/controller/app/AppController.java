package com.tmi.controller.app;

import java.util.Date;
import java.util.List;

import com.tmi.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tmi.entity.App;
import com.tmi.entity.Project;
import com.tmi.repository.AppRepository;
import com.tmi.repository.ProjectRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/app")
public class AppController {
	@Autowired
	private AppService service;

	@GetMapping

	ResponseEntity<List<App>> getAllApp() {
		List<App> list = service.getAllApp();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	ResponseEntity<App> getApp(@PathVariable String id) {
		App app = service.findById(id);
		if(app == null){
			throw new AppNotFoundException(id);
		}
		return new ResponseEntity<>(app, HttpStatus.OK);
	}

	@GetMapping("/project/{pid}")
	ResponseEntity<List<App>> getAppListByProjectId(@PathVariable Long pid) {
		List<App> app = service.getAppListByProjectId(pid);
//		System.out.println(app);
		return new ResponseEntity<>(app, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	boolean deleteAppById(@PathVariable String id) {
		service.deleteAppById(id);
		return false;
	}

//	AppId 암호화 후 진행
//	@PostMapping("/project/{id}")
//	App postAppAtProject(@RequestBody App app, @PathVariable long id) {
//		Project project = projectRepository.findById(id).get();
//		app.setId("test");
//		app.setProject(project);
//		app.setRegDate(new Date());
//		return repo.save(app);
//	}
//
	@PutMapping("/{id}")
	ResponseEntity<Boolean> putAppData(@RequestBody App app, @PathVariable String id) {
		if(app == null || id == null){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}else{
			service.putAppData(app, id);
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}
}
