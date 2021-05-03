package com.tmi.repository;

import com.tmi.entity.TestData;
import com.tmi.entity.TestNo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestDataRepository extends JpaRepository<TestData, TestNo> {
    List<TestData> findAllByProjectIdEquals(Long projectId);
}
