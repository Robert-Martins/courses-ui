package com.robert.martins.courses_ui.presentation.controllers;

import com.robert.martins.courses_ui.infrastructure.vo.filters.AlunoFilter;
import com.robert.martins.courses_ui.presentation.dtos.AlunoDto;
import com.robert.martins.courses_ui.presentation.services.IAlunoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alunos")
@RequiredArgsConstructor
public class AlunoController {

    private final IAlunoService alunoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AlunoDto create(@RequestBody @Valid AlunoDto alunoDto) {
        return alunoService.create(alunoDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<AlunoDto> findAll(Pageable pageable, AlunoFilter alunoFilter) {
        return alunoService.findAll(pageable, alunoFilter);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AlunoDto findById(@PathVariable(name = "id") Integer id) {
        return alunoService.findById(id);
    }

    @GetMapping("/exists-by-cpf/{cpf}")
    @ResponseStatus(HttpStatus.OK)
    public Boolean findById(@PathVariable(name = "cpf") String cpf, @RequestParam(name = "id", required = false) Integer id) {
        return alunoService.existsByCpf(cpf, id);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody @Valid AlunoDto alunoDto) {
        alunoService.update(alunoDto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable(name = "id") Integer id) {
        alunoService.delete(id);
    }

}
