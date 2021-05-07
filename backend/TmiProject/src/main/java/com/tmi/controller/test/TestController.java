package com.tmi.controller.test;

import com.tmi.entity.Test;
import com.tmi.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class TestController {

    private final TestRepository repository;

    @Autowired
    public TestController(TestRepository repository) {
        this.repository = repository;
    }

    @GetMapping()
    List<Test> getTestList() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    Test getTestById(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new TestNotFoundException(id));
    }

    @PostMapping()
    Test postTest(@RequestBody Test newTest) {
        return repository.save(newTest);
    }

    // Update와 Delete는 추후에 수정할 것 ( TestJob을 지우는 것인가? TestJob의 각 Test를 지우는 것인가?)

    @PutMapping("/{id}")
    Test updateTest(@RequestBody Test newTest, @PathVariable Long id) {
        return repository.findById(id)
                .map(Test -> {
                    Test.setName(newTest.getName());
                    Test.setType(newTest.getType());
                    Test.setErrorType(newTest.getErrorType());
                    Test.setErrorMessage(newTest.getErrorMessage());
                    Test.setElapsedTime(newTest.getElapsedTime());

                    return repository.save(Test);
                })
                .orElseGet(() -> {
                    newTest.setId(id);
                    return repository.save(newTest);
                });
    }

    @DeleteMapping("/{pid}/{id}")
    void deleteTest(@PathVariable Long id) {

        repository.deleteById(id);
    }
}
