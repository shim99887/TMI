package com.tmi.controller.app;

public class AppNotFoundException extends RuntimeException {
    AppNotFoundException(String id) {
        super("Could not find App " + id);
    }
}