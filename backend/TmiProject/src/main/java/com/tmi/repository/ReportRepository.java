package com.tmi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tmi.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findAllByAppIdOrderByIdDesc(Long aid);

    List<Report> findAllByOrderByIdDesc();
    
    List<Report> findByAppIdAndDatetime(Long aid, String datetime);
}
