package com.robert.martins.courses_ui.presentation.services;

import com.robert.martins.courses_ui.infrastructure.vo.filters.CursoFilter;
import com.robert.martins.courses_ui.presentation.dtos.CursoDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICursoService {

    CursoDto create(CursoDto cursoDto);

    Page<CursoDto> findAll(Pageable pageable, CursoFilter cursoFilter);

    CursoDto findById(Integer id);

    Boolean existsById(Integer id);

    void update(CursoDto cursoDto);

    void delete(Integer id);

}
