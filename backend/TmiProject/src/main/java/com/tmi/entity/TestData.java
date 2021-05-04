package com.tmi.entity;

import javax.persistence.*;

import lombok.*;

@Entity
@ToString
@Data
@IdClass(TestNo.class)
@Table(name="test_data")
public class TestData {

    @Id
    private Long projectId;
    @Id
    private Long testId;
    @Id
    private Long no;

    private String testSetName; //ex) org.springframework.samples.petclinic.owner.VisitControllerTests
    private Integer runCount;
    private Integer failCount;
    private Integer errorCount;
    private Integer skipCount;
    private Float elapsedTime;
    //txt에 대한 property만 가져옴. xml 파일의 정보도 추가 고려해야함.

}

