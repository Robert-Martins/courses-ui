package com.robert.martins.courses_ui.infrastructure.vo.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ExceptionDetails {

    private String title;

    private int status;

    private String details;

    private String developerMessage;

    private String className;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime timestamp;

    @Override
    public String toString() {
        return "{" +
                "\"title\": \"" + title + "\"," +
                "\"status\": " + status + "," +
                "\"details\": \"" + details + "\"," +
                "\"developerMessage\": \"" + developerMessage + "\"," +
                "\"className\": \"" + className + "\"," +
                "\"timestamp\": \"" + timestamp + "\"" +
                "}";
    }

}