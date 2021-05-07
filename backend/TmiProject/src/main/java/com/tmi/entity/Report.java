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
public class Report {

    @Id
    private Long id;

    // @ManyToOne
    // @JoinColumn(name = "appId")
    // private App appId;

    // @OneToMany(mappedBy = "report")
    // private List<Test> tests = new ArrayList<Test>();

    @OneToMany(mappedBy = "report")
    private List<Coverage> coverages = new ArrayList<Coverage>();

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
