package com.tmi.tmi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tmi.tmi.model.Coverage;
import com.tmi.tmi.repository.CoverageRepository;

import io.swagger.annotations.ApiOperation;

//@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CoverageController {
	@Autowired
	private CoverageRepository coverageRepository;
	
	@GetMapping("/coverage")
	@ApiOperation(value = "getAllCoverages", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<List<Coverage>> getAllCoverages() {
		return new ResponseEntity<>(coverageRepository.findAll(),HttpStatus.OK);
	}
}