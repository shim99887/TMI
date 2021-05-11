package com.tmi.controller.app;

public class AppNotFoundException extends RuntimeException {
    AppNotFoundException(Long id) {
        super("Could not find project " + id);
    }
}