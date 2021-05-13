package com.tmi.service;

import com.tmi.entity.App;

import java.util.List;

public interface AppService {
    List<App> getAllApp();
    App getApp(String id);
    List<App> getAppListByProjectId(Long pid);
    boolean deleteAppById(String id);
    void putAppData(App app, String id);
    App findById(String id);

//    App postAppAtProject(App app, long id);
}
