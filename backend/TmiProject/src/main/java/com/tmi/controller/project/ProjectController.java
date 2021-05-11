package com.tmi.controller.project;

import com.tmi.entity.Project;
import com.tmi.repository.ProjectRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/project")
public class ProjectController {

    private final ProjectRepository repository;

    @Autowired
    public ProjectController(ProjectRepository repository) {
        this.repository = repository;
    }

    @GetMapping()
    List<Project> all() {
        return repository.findAll();
    }

    @PostMapping()
    Project newProject(@RequestBody Project newProject) {
        return repository.save(newProject);
    }

    @GetMapping("/{id}")
    Project one(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new ProjectNotFoundException(id));
    }

    @PutMapping("/{id}")
    Project replaceProject(@RequestBody Project newProject, @PathVariable Long id) {
        return repository.findById(id).map(Project -> {
            Project.setTitle(newProject.getTitle());
            Project.setDescription(newProject.getDescription());
            Project.setRegDate(newProject.getRegDate());
            Project.setDepartment(newProject.getDepartment());
            return repository.save(Project);
        }).orElseGet(() -> {
            newProject.setId(id);
            return repository.save(newProject);
        });
    }

    @DeleteMapping("/{id}")
    void deleteProject(@PathVariable Long id) {
        repository.deleteById(id);
    }
}