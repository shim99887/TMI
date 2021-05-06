package com.tmi.controller.test;

import com.tmi.controller.project.ProjectNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class testNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(ProjectNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String projectNotFoundHandler(ProjectNotFoundException ex) {
        return ex.getMessage();
    }

    // @ResponseBody
    // @ExceptionHandler(TestJobNotFoundException.class)
    // @ResponseStatus(HttpStatus.NOT_FOUND)
    // String testJobNotFoundHandler(TestJobNotFoundException ex) {
    // return ex.getMessage();
    // }
}
