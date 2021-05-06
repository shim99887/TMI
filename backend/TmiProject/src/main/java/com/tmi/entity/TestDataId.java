package com.tmi.entity;

import java.io.Serializable;

public class TestDataId implements Serializable {
    private TestId test;
    private Long testDataId;

    public TestDataId() {
    }

    public TestDataId(TestId test, Long testDataId) {
        this.test = test;
        this.testDataId = testDataId;
    }
}
