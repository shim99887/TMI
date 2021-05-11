package com.tmi.controller.app;

import com.tmi.controller.app.AppNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AppNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(AppNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String appNotFoundHandler(AppNotFoundException ex) {
        return ex.getMessage();
    }
}
