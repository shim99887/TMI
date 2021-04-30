package com.tmi.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@ToString
public class Jacoco {

    @Id @GeneratedValue
    private Long id;

    private String groupName;
    private String packageName;
    private String className;
    private String instructionMissed;
    private String instructionCovered;
    private String branchMissed;
    private String branchCovered;
    private String lineMissed;
    private String lineCovered;
    private String complexityMissed;
    private String complexityCovered;
    private String methodMissed;
    private String methodCovered;
}
