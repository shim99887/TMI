package com.tmi.controller.jacoco;

public class JacocoNotFoundException extends RuntimeException {
    JacocoNotFoundException(Long id) {
        super("Could not find jacoco data " + id);
    }
}