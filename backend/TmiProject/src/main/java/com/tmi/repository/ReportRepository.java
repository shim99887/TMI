package com.tmi.repository;

import com.tmi.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    @Query(value = "select * from report  where app_id = :aid order by id desc", nativeQuery = true)
    List<Report> findAllByAppIdOrderByIdDesc(String aid);

    List<Report> findAllByOrderByIdDesc();
}
