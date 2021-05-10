package com.tmi.controller.testjob;

import com.tmi.entity.App;
import com.tmi.entity.TestJobId;
import com.tmi.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/app")
public class AppController {
    @Autowired
    private AppRepository repo;

    @GetMapping
    List<App> getAllApp(){
        return repo.findAll();
    }

//    @GetMapping("/{pid}")
//    TestJob getAppListByProjectId(@PathVariable int pid) {
//        return repo.findById(testJobId).get();
//    }

    @DeleteMapping("/{id}")
    boolean deleteAppById(@PathVariable int id){
        repo.deleteById(id);
        return false;
    }

    @PostMapping
    void postAppData(@RequestBody App app){
        app.setRegDate(new Date());
        repo.save(app);
    }

    @PutMapping("/{id}")
    void putAppData(@RequestBody App app, @PathVariable int id){

        repo.findById(id).ifPresent(selectedApp -> {
            selectedApp.setRegDate(new Date());
            selectedApp.setDescription(app.getDescription());
            selectedApp.setGitUrl(app.getGitUrl());
            selectedApp.setTitle(app.getTitle());
            repo.save(selectedApp);
        });
    }
}
