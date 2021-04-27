package com.tmi.tmi.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tmi.tmi.model.Coverage;

public interface CoverageRepository extends MongoRepository<Coverage, String>{
	List<Coverage> findByEmail(String email);
}
