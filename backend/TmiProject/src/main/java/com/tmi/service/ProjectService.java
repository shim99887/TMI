package com.tmi.service;

import com.tmi.entity.Project;
import com.tmi.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    /**
     * Create a project
     */
    public int create(Project project) {
        projectRepository.save(project);
        return project.getId();
    }

    /**
     * Read All Projects
     * @return List<Project>
     */
    public List<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    /**
     * Read a project
     */
    public Optional<Project> findOneProject(int ProjectId) {
        return projectRepository.findById(ProjectId);
    }
}
