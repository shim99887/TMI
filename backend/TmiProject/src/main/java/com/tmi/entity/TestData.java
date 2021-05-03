package com.tmi.entity;

import javax.persistence.*;

import lombok.*;

import java.io.Serializable;

@Entity
@ToString
@Getter
@Setter
public class TestData {

    @EmbeddedId
    private TestNo testNo;

    private String testSetName; //ex) org.springframework.samples.petclinic.owner.VisitControllerTests
    private Integer runCount;
    private Integer failCount;
    private Integer errorCount;
    private Integer skipCount;
    private Float elapsedTime;
    //txt에 대한 property만 가져옴. xml 파일의 정보도 추가 고려해야함.

    @EqualsAndHashCode
    @Embeddable
    @Getter
    @Setter
    public static class TestNo implements Serializable {

        @Column(name="test_id")
        private Long testId;
        @Column(name="project_id")
        private Long projectId;

        public TestNo(){
            this.testId = Long.valueOf(0);
            this.projectId = Long.valueOf(0);
        }
    }
}
