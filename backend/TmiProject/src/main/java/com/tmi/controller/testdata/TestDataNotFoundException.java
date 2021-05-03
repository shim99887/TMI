package com.tmi.controller.testdata;

import com.tmi.entity.TestData;

public class TestDataNotFoundException extends RuntimeException {
    TestDataNotFoundException(TestData.TestNo testNo) {
        super("Could not find testdata " + testNo.getProjectId() + " / " + testNo.getTestId());
    }
}