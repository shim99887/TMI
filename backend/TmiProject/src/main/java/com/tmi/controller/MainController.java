package com.tmi.controller;

import com.tmi.entity.Temp;
import com.tmi.repository.TempRepository;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "HelloController", description = "헬로 에이피아이")
public class MainController {
    @Autowired
    private TempRepository repo;

    @GetMapping("/str")
    public List<Temp> hello(){
        return repo.findAll();
    }
}
