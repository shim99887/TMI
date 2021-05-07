package com.tmi.entity;

import javax.persistence.*;

import lombok.*;

import java.io.Serializable;

@Entity
@Data
@Table(name="test")
public class Test {

    //PK
    @Id
    @GeneratedValue
    @Column(name="test_id")
    private Long id;

    // FK
    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report reportId;

    private String name; //ex) org.springframework.samples.petclinic.owner.VisitControllerTests
    private String type;
    private String errorType;
    private String errorMessage;
    private Integer elapsedTime;

    //txt에 대한 property만 가져옴. xml 파일의 정보도 추가 고려해야함.
}

