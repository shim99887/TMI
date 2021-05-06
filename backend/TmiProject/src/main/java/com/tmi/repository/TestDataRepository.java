package com.tmi.repository;

import com.tmi.entity.TestId;
import com.tmi.entity.TestData;
import com.tmi.entity.TestDataId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestDataRepository extends JpaRepository<TestData, TestDataId> {
    List<TestData> findAllByTestId(TestId testId);
}
