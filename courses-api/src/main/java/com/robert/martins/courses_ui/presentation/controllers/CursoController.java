package com.robert.martins.courses_ui.presentation.controllers;

import com.robert.martins.courses_ui.infrastructure.vo.filters.CursoFilter;
import com.robert.martins.courses_ui.presentation.dtos.CursoDto;
import com.robert.martins.courses_ui.presentation.services.ICursoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cursos")
@RequiredArgsConstructor
public class CursoController {

    private final ICursoService cursoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CursoDto create(@RequestBody @Valid CursoDto cursoDto) {
        return cursoService.create(cursoDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<CursoDto> findAll(Pageable pageable, CursoFilter cursoFilter) {
        return cursoService.findAll(pageable, cursoFilter);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CursoDto findById(@PathVariable(name = "id") Integer id) {
        return cursoService.findById(id);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody @Valid CursoDto cursoDto) {
        cursoService.update(cursoDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id") Integer id) {
        cursoService.delete(id);
    }

}
