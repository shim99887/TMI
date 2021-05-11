package com.tmi.controller.test;

import com.tmi.entity.Report;
import com.tmi.entity.Test;
import com.tmi.repository.ReportRepository;
import com.tmi.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/test")
public class TestController {

    private final TestRepository testRepository;
    private final ReportRepository reportRepository;

    @Autowired
    public TestController(TestRepository testRepository, ReportRepository reportRepository) {
        this.testRepository = testRepository;
        this.reportRepository = reportRepository;
    }

    @GetMapping()
    List<Test> getTestList() {
        return testRepository.findAll();
    }

    @GetMapping("/{id}")
    Test getTest(@PathVariable Long id) {
        return testRepository.findById(id)
                .orElseThrow(() -> new TestNotFoundException(id));
    }

    @GetMapping("/report/{rid}")
    List<Test> getTestListByReportId(@PathVariable Long rid) {
        return testRepository.findAllByReport_Id(rid);
    }

    @PostMapping("/{rid}")
    Test postTest(@RequestBody Test newTest, @PathVariable Long rid) {
        Test NewTest = new Test(newTest);
        Optional<Report> report = reportRepository.findById(rid);
        if (!report.isPresent()) {
            throw new IllegalArgumentException();
        }
        NewTest.setReport(report.get());
        return testRepository.save(NewTest);
    }

    @PutMapping("/{id}")
    Test updateTest(@RequestBody Test newTest, @PathVariable Long id) {
        return testRepository.findById(id)
                .map(Test -> {
                    Test.setName(newTest.getName());
                    Test.setType(newTest.getType());
                    Test.setErrorType(newTest.getErrorType());
                    Test.setErrorMessage(newTest.getErrorMessage());
                    Test.setElapsedTime(newTest.getElapsedTime());

                    return testRepository.save(Test);
                })
                .orElseGet(() -> {
                    newTest.setId(id);
                    return testRepository.save(newTest);
                });
    }

    @DeleteMapping("/{id}")
    void deleteTest(@PathVariable Long id) {

        testRepository.deleteById(id);
    }
}
