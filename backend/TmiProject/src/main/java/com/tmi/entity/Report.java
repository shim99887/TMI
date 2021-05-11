package com.tmi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Data
public class Report {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private App app;

    @OneToMany(mappedBy = "report")
    @JsonIgnore
    private List<Coverage> coverages = new ArrayList<>();

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
