package com.tmi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
public class Coverage {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JsonIgnore
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
