package com.tmi.controller.testdata;

import com.tmi.entity.TestData;
import com.tmi.entity.TestNo;
import com.tmi.repository.TestDataRepository;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RequestMapping("/testjob")
public class TestDataController {

    private final TestDataRepository repository;

    @Autowired
    public TestDataController(TestDataRepository repository) {
        this.repository = repository;
    }

    @GetMapping()
    List<TestData> getTestDataList() {
        return repository.findAll();
    }

    @GetMapping("/{pid}")
    List<TestData> getTestDataListByProjectId(@PathVariable Long pid) {
        return repository.findAllByProjectIdEquals(pid);
    }

    @PostMapping()
    TestData postTestData(@RequestBody TestData newTestData) {
        return repository.save(newTestData);
    }

    @GetMapping("/{pid}/{id}")
    TestData getTestData(@PathVariable Long pid, @PathVariable Long id) {
        TestNo testNo = new TestNo();
        testNo.setTestId(id);
        testNo.setProjectId(pid);
        return repository.findById(testNo)
                .orElseThrow(() -> new TestDataNotFoundException(testNo));
    }

    @PutMapping("/{pid}/{id}")
    TestData updateTestData(@RequestBody TestData newTestData, @PathVariable Long pid, @PathVariable Long id) {
        TestNo testNo = new TestNo();
        testNo.setTestId(id);
        testNo.setProjectId(pid);
        return repository.findById(testNo)
                .map(TestData -> {
                    TestData.setTestSetName(newTestData.getTestSetName());
                    TestData.setRunCount(newTestData.getRunCount());
                    TestData.setFailCount(newTestData.getFailCount());
                    TestData.setErrorCount(newTestData.getErrorCount());
                    TestData.setSkipCount(newTestData.getSkipCount());
                    TestData.setElapsedTime(newTestData.getElapsedTime());

                    return repository.save(TestData);
                })
                .orElseGet(() -> {
                    newTestData.setProjectId(pid);
                    newTestData.setTestId(id);
                    return repository.save(newTestData);
                });
    }

    @DeleteMapping("/{pid}/{id}")
    void deleteTestData(@PathVariable Long pid, @PathVariable Long id) {
        TestNo testNo = new TestNo();
        testNo.setTestId(id);
        testNo.setProjectId(pid);

        repository.deleteById(testNo);
    }
}
