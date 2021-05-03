package com.tmi.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Embeddable;
import java.io.Serializable;

@EqualsAndHashCode
@Embeddable
@Data
public class TestNo implements Serializable {

    private Long testId;
    private Long projectId;

    public TestNo(){
    }
}