package com.tmi.repository;

import com.tmi.entity.TestJob;
import com.tmi.entity.TestJobId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestJobRepository extends JpaRepository<TestJob, TestJobId> {
}
