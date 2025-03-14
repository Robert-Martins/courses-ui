package com.robert.martins.courses_ui.presentation.controllers;

import com.robert.martins.courses_ui.presentation.dtos.EnumDto;
import com.robert.martins.courses_ui.presentation.services.IEnumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/app")
@RequiredArgsConstructor
public class ApplicationController {

    private final IEnumService enumService;

    @GetMapping("/health")
    @ResponseStatus(HttpStatus.OK)
    public String health() {
        return "Courses API Running!";
    }

    @GetMapping("/enums/{enumName}")
    @ResponseStatus(HttpStatus.OK)
    public Set<EnumDto> enums(@PathVariable(name = "enumName") String enumName) {
        return this.enumService.findEnumByName(enumName);
    }

}
