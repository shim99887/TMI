package com.tmi.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@ToString
@Getter
@Setter
public class TestData {
	@Id @GeneratedValue
    private long no;
    private String testSetName; //ex) org.springframework.samples.petclinic.owner.VisitControllerTests
    private int runCount;
    private int failCount;
    private int errorCount;
    private int skipCount;
    private float elapsedTime;
    //txt에 대한 property만 가져옴. xml 파일의 정보도 추가 고려해야함.
}