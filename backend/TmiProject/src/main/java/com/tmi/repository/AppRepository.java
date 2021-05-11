package com.tmi.repository;

import java.util.List;

import com.tmi.entity.App;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppRepository extends JpaRepository<App, Long> {
    List<App> findAllByProjectIdEquals(Long pid);
}
