package com.tmi.tmi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tmi.tmi.model.Test;

public interface TestRepository extends MongoRepository<Test, String>{
	
}