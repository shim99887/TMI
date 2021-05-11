package com.tmi.controller.app;

import com.tmi.controller.test.TestNotFoundException;
import com.tmi.entity.App;
import com.tmi.entity.Project;
import com.tmi.repository.AppRepository;
import com.tmi.repository.ProjectRepository;
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

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    List<App> getAllApp() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    App getApp(@PathVariable String id){
        return repo.findById(id).orElseThrow(() -> new AppNotFoundException(id));
    }

    @GetMapping("/project/{pid}")
    List<App> getAppListByProjectId(@PathVariable Long pid) {
        return repo.findAllByProjectIdEquals(pid);
    }

    @DeleteMapping("/{id}")
    boolean deleteAppById(@PathVariable String id) {
        repo.deleteById(id);
        return false;
    }

    @PostMapping("/project/{id}")
    App postAppAtProject(@RequestBody App app, @PathVariable long id) {
        Project project = projectRepository.findById(id).get();
        app.setProject(project);
        return repo.save(app);
    }

    @PutMapping("/{id}")
    void putAppData(@RequestBody App app, @PathVariable String id) {

        repo.findById(id).ifPresent(selectedApp -> {
            selectedApp.setRegDate(new Date());
            selectedApp.setDescription(app.getDescription());
            selectedApp.setGitUrl(app.getGitUrl());
            selectedApp.setTitle(app.getTitle());
            repo.save(selectedApp);
        });
    }
}
