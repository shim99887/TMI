package com.tmi.controller.test;

public class testNotFoundException extends RuntimeException {
    testNotFoundException(Long id) {
        super("Could not find test" + id);
    }
}
