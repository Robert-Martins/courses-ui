package com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicateKeyException extends RuntimeException {

    public static final String EXCEPTION_DEVELOPER_MESSAGE = "Exception thrown when there was an attempt to persist a value that is unique among certain registries of a class";
    public DuplicateKeyException(String message){
        super(message);
    }

}
