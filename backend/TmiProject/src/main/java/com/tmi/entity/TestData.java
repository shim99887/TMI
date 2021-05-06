package com.tmi.entity;

import javax.persistence.*;

import lombok.*;

import java.io.Serializable;

@Entity
@Data
@Table(name="test_data")
@IdClass(TestDataId.class)
public class TestData {

    // (PK, FK)
    @Id
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "project_id"),
            @JoinColumn(name = "test_id")
    })
    public Test testId;

    //PK
    @Id
    @Column(name="test_data_id")
    private Long testDataId;

    private String name; //ex) org.springframework.samples.petclinic.owner.VisitControllerTests
    private String type;
    private String errorType;
    private String errorMessage;
    private Integer elapsedTime;

    //txt에 대한 property만 가져옴. xml 파일의 정보도 추가 고려해야함.
}

