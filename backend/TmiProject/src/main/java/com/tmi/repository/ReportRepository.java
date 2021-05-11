package com.tmi.repository;

import com.tmi.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAllByAppIdOrderByIdDesc(Long aid);

    List<Report> findAllByOrderByIdDesc();
}
