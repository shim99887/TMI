package com.tmi.controller.testdata;

import com.tmi.entity.TestDataId;

public class TestDataNotFoundException extends RuntimeException {
    TestDataNotFoundException(TestDataId testDataId) {
        super("Could not find testdata " + testDataId.getProjectId() + " / " + testDataId.getTestId());
    }
}