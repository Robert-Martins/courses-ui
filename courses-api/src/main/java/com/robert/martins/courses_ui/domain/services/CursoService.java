package com.robert.martins.courses_ui.domain.services;

import com.robert.martins.courses_ui.domain.models.Curso;
import com.robert.martins.courses_ui.domain.repositories.CursoRepository;
import com.robert.martins.courses_ui.infrastructure.utils.Functions;
import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.BadRequestException;
import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.NotFoundException;
import com.robert.martins.courses_ui.infrastructure.vo.filters.CursoFilter;
import com.robert.martins.courses_ui.presentation.dtos.CursoDto;
import com.robert.martins.courses_ui.presentation.services.ICursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CursoService implements ICursoService {

    private static final String COURSE_NOT_FOUND = "Curso não encontrado";

    private static final String ID_MUST_NOT_BE_INFORMED = "Id não deve ser informado";

    private static final String ID_NOT_INFORMED = "Id não informado";

    private final CursoRepository cursoRepository;

    @Override
    public CursoDto create(CursoDto cursoDto) {
        this.validateCourseMustNotHaveId(cursoDto.getId());
        Curso curso = cursoDto.mapDtoToEntity();
        return this.cursoRepository.save(curso)
                .mapEntityToDto();
    }

    @Override
    public Page<CursoDto> findAll(Pageable pageable, CursoFilter cursoFilter) {
        return this.cursoRepository.findAll(
                pageable,
                cursoFilter.id(),
                cursoFilter.nome(),
                cursoFilter.ativo()
        ).map(Curso::mapEntityToDto);
    }

    @Override
    public CursoDto findById(Integer id) {
        return this.findCourseById(id)
                .mapEntityToDto();
    }

    @Override
    public Boolean existsActiveById(Integer id) {
        return this.cursoRepository.existsActiveById(id);
    }

    @Override
    public void update(CursoDto cursoDto) {
        this.validateCourseId(cursoDto.getId());
        Curso curso = this.findCourseById(cursoDto.getId());
        curso.setNome(cursoDto.getNome());
        curso.setInicioAulas(cursoDto.getInicioAulas());
        curso.setFimAulas(cursoDto.getFimAulas());
        curso.setAtivo(cursoDto.getAtivo());
        this.cursoRepository.save(curso);
    }

    @Override
    public void delete(Integer id) {
        this.validateCourseId(id);
        this.cursoRepository.deleteById(id);
    }

    private Curso findCourseById(Integer id) {
        return this.cursoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(COURSE_NOT_FOUND));
    }

    private void validateCourseMustNotHaveId(Integer id) {
        Functions.acceptFalseThrows(
                id == null,
                () -> new BadRequestException(ID_MUST_NOT_BE_INFORMED)
        );
    }

    private void validateCourseId(Integer id) {
        Functions.ifEmptyThrows(
                id,
                () -> new BadRequestException(ID_NOT_INFORMED)
        );
        Functions.acceptFalseThrows(
                this.cursoRepository.existsById(id),
                () -> new NotFoundException(COURSE_NOT_FOUND)
        );
    }

}
