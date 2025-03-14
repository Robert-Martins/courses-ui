package com.robert.martins.courses_ui.presentation.services;

import com.robert.martins.courses_ui.infrastructure.vo.filters.AlunoFilter;
import com.robert.martins.courses_ui.presentation.dtos.AlunoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IAlunoService {

    AlunoDto create(AlunoDto alunoDto);

    Page<AlunoDto> findAll(Pageable pageable, AlunoFilter alunoFilter);

    AlunoDto findById(Integer id);

    Boolean existsByCpf(String cpf, Integer id);

    void update(AlunoDto alunoDto);

    void delete(Integer id);

}
