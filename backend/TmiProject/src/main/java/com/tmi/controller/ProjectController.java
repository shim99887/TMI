package com.tmi.controller;

import com.tmi.entity.Project;
import com.tmi.service.ProjectService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    @ApiOperation(value = "전체 프로젝트 조회")
    public List<Project> readAllProjects() {
        return projectService.findAllProjects();
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "단일 프로젝트 조회")
    public Optional<Project> readProject(@PathVariable("id") int id) {
        return projectService.findOneProject(id);
    }
}
