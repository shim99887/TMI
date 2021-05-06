package com.tmi.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Embeddable;
import javax.persistence.Id;
import java.io.Serializable;

@EqualsAndHashCode
@Embeddable
@Data
public class TestJobId implements Serializable {
    @Id
    private long testjob_id;
    @Id
    private long project_id;

    public TestJobId(){

    }
}
