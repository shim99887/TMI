package com.tmi.repository;

import com.tmi.entity.PackageCoverage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageCoverageRepository extends JpaRepository<PackageCoverage, Long> {
}
