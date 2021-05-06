package com.tmi.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Data
@IdClass(TestId.class)
@ToString
public class Test {

    @Id
    @Column(name="test_id")
    private Long testId;

    // @ManyToOne
    // @JoinColumn(name = "testJobId")
    // private TestJob testJobId;

    @Id
    @ManyToOne
    @JoinColumn(name = "project_id")
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

