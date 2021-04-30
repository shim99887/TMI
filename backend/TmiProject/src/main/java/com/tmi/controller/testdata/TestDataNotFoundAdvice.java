package com.tmi.controller.testdata;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class TestDataNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(TestDataNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String testDataNotFoundHandler(TestDataNotFoundException ex) {
        return ex.getMessage();
    }
}
