package com.tmi.controller.app;

import com.tmi.controller.test.TestNotFoundException;
import com.tmi.entity.App;
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

    @GetMapping("/{id}")
    App getApp(@PathVariable Long id){
        return repo.findById(id).orElseThrow(() -> new AppNotFoundException(id));
    }

    // TestJob getAppListByP
    // return repo.findById(testJobId).get();
    //

    @DeleteMapping("/{id}")
    boolean deleteAppById(@PathVariable Long id) {
        repo.deleteById(id);
        return false;
    }

    @PostMapping
    void postAppData(@RequestBody App app) {
        app.setRegDate(new Date());
        repo.save(app);
    }

    @PutMapping("/{id}")
    void putAppData(@RequestBody App app, @PathVariable Long id) {

        repo.findById(id).ifPresent(selectedApp -> {
            selectedApp.setRegDate(new Date());
            selectedApp.setDescription(app.getDescription());
            selectedApp.setGitUrl(app.getGitUrl());
            selectedApp.setTitle(app.getTitle());
            repo.save(selectedApp);
        });
    }
}
