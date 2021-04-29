package com.tmi.repository;

import com.tmi.entity.Jacoco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JacocoRepository extends JpaRepository<Jacoco, Long> {
}
