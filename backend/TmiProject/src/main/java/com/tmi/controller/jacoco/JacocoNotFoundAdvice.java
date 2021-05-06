package com.tmi.controller.jacoco;


import com.tmi.entity.Jacoco;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class JacocoNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(JacocoNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String projectNotFoundHandler(JacocoNotFoundException ex) {
        return ex.getMessage();
    }
}
