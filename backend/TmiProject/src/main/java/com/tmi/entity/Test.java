package com.tmi.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;

@Entity
@Getter
@Setter
@ToString
public class Test {

    @Id
    private Long testId;

    // @ManyToOne
    // @JoinColumn(name = "testJobId")
    // private TestJob testJobId;

    @ManyToOne
    @JoinColumn(name = "projectId")
    private Project projectId;

    // @OneToMany(mappedBy = "test")
    // private List<TestData> testDatas = new ArrayList<TestData>();

    @OneToMany(mappedBy = "test")
    private List<PackageCoverage> packageCoverages = new ArrayList<PackageCoverage>();

    private String title;
    private String description;
    private LocalDateTime datetime;
    private Integer totalLineCovMissed;
    private Integer totalLineCovCovered;
    private Integer totalBranchCovMissed;
    private Integer totalBranchCovCovered;
    private Integer totalRunCount;
    private Integer totalFailCount;
    private Integer totalSkipCount;
    private Integer totalErrorCount;
    private Integer totalElapsedTime;
}
