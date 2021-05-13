package com.tmi.service;

import com.tmi.controller.app.AppNotFoundException;
import com.tmi.entity.App;
import com.tmi.entity.Project;
import com.tmi.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AppServiceImpl implements AppService{
    @Autowired
    private AppRepository repo;

    public List<App> getAllApp() {
        return repo.findAll();
    }

    public App getApp(String id) {
        return repo.findById(id).orElseThrow(() -> new AppNotFoundException(id));
    }

    public List<App> getAppListByProjectId(Long pid) {
        return repo.findAllByProjectIdEquals(pid);
    }

    public boolean deleteAppById(String id) {
        repo.deleteById(id);
        return false;
    }
/*  App Id 암호화 후 진행
    public App postAppAtProject(@RequestBody App app, @PathVariable long id) {
        Project project = projectRepository.findById(id).get();
        app.setId("test");
        app.setProject(project);
        app.setRegDate(new Date());
        return repo.save(app);
    }
*/
    public void putAppData(App app, String id) {

        repo.findById(id).ifPresent(selectedApp -> {
            selectedApp.setRegDate(new Date());
            selectedApp.setDescription(app.getDescription());
            selectedApp.setGitUrl(app.getGitUrl());
            selectedApp.setTitle(app.getTitle());
            repo.save(selectedApp);
        });
    }

    @Override
    public App findById(String id) {
        Optional<App> app = repo.findById(id);

        if(app.isPresent()){
            return app.get();
        }else{
            return null;
        }
    }
}
