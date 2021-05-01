package com.tmi.repository;

import com.tmi.entity.TestData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestDataRepository extends JpaRepository<TestData, TestData.TestNo> {

}
