package com.tmi.controller.testdata;

import com.tmi.entity.TestNo;

public class TestDataNotFoundException extends RuntimeException {
    TestDataNotFoundException(TestNo testNo) {
        super("Could not find testdata " + testNo.getProjectId() + " / " + testNo.getTestId());
    }
}