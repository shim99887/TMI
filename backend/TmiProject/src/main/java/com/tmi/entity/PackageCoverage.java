package com.tmi.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
public class PackageCoverage {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "testId")
    private Test test;
    private String groupName;
    private String packageName;
    private String className;
    private int lineCovMissed;
    private int lineCovCovered;
    private int branchCovMissed;
    private int branchCovCovered;
    private String highlightHtml;
}
