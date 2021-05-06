package com.tmi.entity;

import java.io.Serializable;

public class TestId implements Serializable {
    private Long project;
    private Long testId;

    public TestId() {
    }

    public TestId(Long project, Long testId) {
        this.project = project;
        this.testId = testId;
    }
}
