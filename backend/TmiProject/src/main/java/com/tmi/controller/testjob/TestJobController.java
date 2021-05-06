package com.tmi.controller.testjob;

import com.tmi.entity.TestJob;
import com.tmi.entity.TestJobId;
import com.tmi.repository.TestJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/testjob")
public class TestJobController {
    @Autowired
    private TestJobRepository repo;

    @GetMapping
    List<TestJob> getAllTestJob(){
        return repo.findAll();
    }

    @GetMapping("/{pid}/{tid}")
    TestJob getTestJobListByProjectId(@PathVariable Long pid, @PathVariable Long tid) {
        TestJobId testJobId = new TestJobId();
        testJobId.setProject_id(pid);
        testJobId.setTestjob_id(tid);
        return repo.findById(testJobId).get();
    }

    @DeleteMapping("/{pid}/{tid}")
    boolean deleteTestJobByTestJobId(@PathVariable Long pid, @PathVariable Long tid){
        TestJobId testJobId = new TestJobId();
        testJobId.setTestjob_id(tid);
        testJobId.setProject_id(pid);
        repo.deleteById(testJobId);
        return false;
    }

    @PostMapping
    void postTestJobData(@RequestBody TestJob testJob){
        testJob.setTestjob_regdate(new Date());
        repo.save(testJob);
    }

    @PutMapping("/{pid}/{tid}")
    void putTestJobData(@RequestBody TestJob testJob, @PathVariable long pid, @PathVariable long tid){
        TestJobId testJobId = new TestJobId();
        testJobId.setProject_id(pid);
        testJobId.setTestjob_id(tid);

        repo.findById(testJobId).ifPresent(selectedJob -> {
            selectedJob.setTestjob_desc(testJob.getTestjob_desc());
            selectedJob.setTestjob_tag(testJob.getTestjob_tag());
            selectedJob.setTestjob_name(testJob.getTestjob_name());
            selectedJob.setTestjob_regdate(new Date());
            repo.save(selectedJob);
        });
    }
}
