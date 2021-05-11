package com.tmi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private App app;

    @OneToMany(mappedBy = "report")
    @JsonIgnore
    private List<Test> tests = new ArrayList<>();

    @OneToMany(mappedBy = "report")
    @JsonIgnore
    private List<Coverage> coverages = new ArrayList<>();

    private LocalDateTime datetime;
    private int totalLineCovMissed;
    private int totalLineCovCovered;
    private int totalBranchCovMissed;
    private int totalBranchCovCovered;
    private int totalRunCount;
    private int totalFailCount;
    private int totalSkipCount;
    private int totalErrorCount;
    private int totalElapsedTime;

    public Report(LocalDateTime datetime, int totalLineCovMissed, int totalLineCovCovered, int totalBranchCovMissed,
            int totalBranchCovCovered, int totalRunCount, int totalFailCount, int totalSkipCount, int totalErrorCount,
            int totalElapsedTime) {
        this.datetime = datetime;
        this.totalLineCovMissed = totalBranchCovMissed;
        this.totalLineCovCovered = totalLineCovCovered;
        this.totalBranchCovMissed = totalBranchCovMissed;
        this.totalBranchCovCovered = totalBranchCovCovered;
        this.totalRunCount = totalRunCount;
        this.totalFailCount = totalFailCount;
        this.totalSkipCount = totalSkipCount;
        this.totalErrorCount = totalErrorCount;
        this.totalElapsedTime = totalElapsedTime;
    }
}
