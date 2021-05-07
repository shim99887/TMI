package com.tmi.controller.report;

public class reportNotFoundException extends RuntimeException {
    reportNotFoundException(Long id) {
        super("Could not find test" + id);
    }
}
