package com.tmi.controller.jacoco;

import com.tmi.controller.project.ProjectNotFoundException;
import com.tmi.entity.Jacoco;
import com.tmi.entity.Project;
import com.tmi.repository.JacocoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jacoco")
public class JacocoController {

    @Autowired
    private JacocoRepository repository;

    @GetMapping()
    List<Jacoco> all() {
        return repository.findAll();
    }

    @PostMapping()
    Jacoco newProject(@RequestBody Jacoco newJacoco) {
        return repository.save(newJacoco);
    }

    @GetMapping("/{id}")
    Jacoco one(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new JacocoNotFoundException(id));
    }

    @PutMapping("/{id}")
    Jacoco replaceProject(@RequestBody Jacoco newJacoco, @PathVariable Long id) {
        return repository.findById(id)
                .map(Jacoco -> {
                    Jacoco.setGroupName(newJacoco.getMethodCovered());
                    Jacoco.setPackageName(newJacoco.getMethodCovered());
                    Jacoco.setClassName(newJacoco.getMethodCovered());
                    Jacoco.setInstructionMissed(newJacoco.getMethodCovered());
                    Jacoco.setInstructionCovered(newJacoco.getMethodCovered());
                    Jacoco.setBranchMissed(newJacoco.getMethodCovered());
                    Jacoco.setBranchCovered(newJacoco.getMethodCovered());
                    Jacoco.setLineMissed(newJacoco.getMethodCovered());
                    Jacoco.setMethodCovered(newJacoco.getMethodCovered());
                    Jacoco.setMethodCovered(newJacoco.getMethodCovered());
                    Jacoco.setMethodCovered(newJacoco.getMethodCovered());
                    Jacoco.setMethodCovered(newJacoco.getMethodCovered());
                    Jacoco.setMethodCovered(newJacoco.getMethodCovered());
                    return repository.save(Jacoco);
                })
                .orElseGet(() -> {
                    newJacoco.setId(id);
                    return repository.save(newJacoco);
                });
    }

    @DeleteMapping("/{id}")
    void deleteProject(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
