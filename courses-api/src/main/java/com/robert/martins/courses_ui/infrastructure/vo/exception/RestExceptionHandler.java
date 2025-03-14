package com.robert.martins.courses_ui.infrastructure.vo.exception;

import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.BadRequestException;
import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.DuplicateKeyException;
import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionDetails> handleNotFoundException(NotFoundException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Não Encontrado")
                        .status(HttpStatus.NOT_FOUND.value())
                        .details(exception.getMessage())
                        .developerMessage(NotFoundException.EXCEPTION_DEVELOPER_MESSAGE)
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.NOT_FOUND
        );
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDetails> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Requisição Inválida")
                        .status(HttpStatus.BAD_REQUEST.value())
                        .details(
                                exception
                                        .getBindingResult()
                                        .getAllErrors()
                                        .stream()
                                            .map(error -> ((FieldError) error).getField())
                                            .collect(Collectors.joining(", "))
                                            .concat(" é(são) obrigatório(s)")
                        )
                        .developerMessage("Parâmetros inválidos")
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<ExceptionDetails> handleDuplicateKeyException(DuplicateKeyException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Chave Duplicada")
                        .status(HttpStatus.BAD_REQUEST.value())
                        .details(exception.getMessage())
                        .developerMessage(DuplicateKeyException.EXCEPTION_DEVELOPER_MESSAGE)
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionDetails> handleBadRequestException(BadRequestException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Requisição Inválida")
                        .status(HttpStatus.BAD_REQUEST.value())
                        .details(exception.getMessage())
                        .developerMessage(BadRequestException.EXCEPTION_DEVELOPER_MESSAGE)
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ExceptionDetails> handleNullPointerException(NullPointerException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Erro Interno")
                        .status(HttpStatus.BAD_REQUEST.value())
                        .details(exception.getMessage())
                        .developerMessage(NullPointerException.class.getName())
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionDetails> handleHttpMessageNotReadableException(HttpMessageNotReadableException exception){
        return new ResponseEntity<>(
                ExceptionDetails.builder()
                        .title("Requisição Inválida")
                        .status(HttpStatus.BAD_REQUEST.value())
                        .details(exception.getMessage())
                        .developerMessage(HttpMessageNotReadableException.class.getName())
                        .className(Arrays.stream(exception.getStackTrace()).findFirst().map(StackTraceElement::getClassName).orElse(null))
                        .timestamp(LocalDateTime.now())
                        .build(),
                HttpStatus.BAD_REQUEST
        );
    }

}

