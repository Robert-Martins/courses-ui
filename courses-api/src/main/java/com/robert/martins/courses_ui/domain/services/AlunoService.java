package com.robert.martins.courses_ui.domain.services;

import com.robert.martins.courses_ui.domain.models.Aluno;
import com.robert.martins.courses_ui.domain.repositories.AlunoRepository;
import com.robert.martins.courses_ui.infrastructure.utils.Functions;
import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.BadRequestException;
import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.DuplicateKeyException;
import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.NotFoundException;
import com.robert.martins.courses_ui.infrastructure.vo.filters.AlunoFilter;
import com.robert.martins.courses_ui.presentation.dtos.AlunoDto;
import com.robert.martins.courses_ui.presentation.services.IAlunoService;
import com.robert.martins.courses_ui.presentation.services.ICursoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlunoService implements IAlunoService {

    private static final String STUDENT_NOT_FOUND = "Aluno não encontrado";

    private static final String COURSE_NOT_FOUND = "Curso não encontrado";

    private static final String STUDENT_WITH_CPF_ALREADY_EXISTS = "Aluno com CPF %s já cadastrado";

    private static final String ID_MUST_NOT_BE_INFORMED = "Id não deve ser informado";

    private static final String ID_NOT_INFORMED = "Id não informado";

    private static final String COURSE_ID_NOT_INFORMED = "Id do curso não informado";

    private final AlunoRepository alunoRepository;

    private final ICursoService cursoService;

    @Override
    public AlunoDto create(AlunoDto alunoDto) {
        this.validateStudentMustNotHaveId(alunoDto.getId());
        this.validateStudentCpf(alunoDto.getCpf());
        this.validateCourseId(alunoDto.getCursoId());
        Aluno aluno = this.alunoRepository.save(alunoDto.mapDtoToEntity());
        this.alunoRepository.enroll(aluno.getId(), alunoDto.getCursoId());
        return aluno.mapEntityToDto();
    }

    @Override
    public Page<AlunoDto> findAll(Pageable pageable, AlunoFilter alunoFilter) {
        return this.alunoRepository.findAll(
                pageable,
                alunoFilter.id(),
                alunoFilter.nome(),
                alunoFilter.cpf(),
                Optional.ofNullable(alunoFilter.situacao()).map(Enum::name).orElse(null),
                alunoFilter.cursoId()
        ).map(Aluno::mapEntityToDto);
    }

    @Override
    public AlunoDto findById(Integer id) {
        return this.appendCourseToStudent(
                this.findStudentById(id)
                        .mapEntityToDto()
        );
    }

    @Override
    public Boolean existsByCpf(String cpf, Integer id) {
        return Optional.ofNullable(id)
                .map(i -> this.alunoRepository.existsByCpfAndIdNot(cpf, i))
                .orElse(this.alunoRepository.existsByCpf(cpf));
    }

    @Override
    public void update(AlunoDto alunoDto) {
        this.validateStudentId(alunoDto.getId());
        this.validateStudentCpf(alunoDto.getCpf(), alunoDto.getId());
        Aluno aluno = this.findStudentById(alunoDto.getId());
        aluno.setNome(alunoDto.getNome());
        aluno.setDataNascimento(alunoDto.getDataNascimento());
        aluno.setCpf(alunoDto.getCpf());
        aluno.setSituacao(alunoDto.getSituacao());
        this.alunoRepository.save(aluno);
    }

    @Override
    public void delete(Integer id) {
        this.validateStudentId(id);
        this.alunoRepository.deleteById(id);
    }

    private AlunoDto appendCourseToStudent(AlunoDto aluno) {
        this.alunoRepository.findCourseIdById(aluno.getId())
                .ifPresent(aluno::setCursoId);
        return aluno;
    }

    private void validateStudentMustNotHaveId(Integer id) {
        Functions.acceptFalseThrows(
                id == null,
                () -> new BadRequestException(ID_MUST_NOT_BE_INFORMED)
        );
    }

    private void validateStudentId(Integer id) {
        Functions.ifEmptyThrows(
                id,
                () -> new BadRequestException(ID_NOT_INFORMED)
        );
        Functions.acceptFalseThrows(
                this.alunoRepository.existsById(id),
                () -> new NotFoundException(STUDENT_NOT_FOUND)
        );
    }

    private void validateStudentCpf(String cpf) {
        Functions.acceptTrueThrows(
                this.alunoRepository.existsByCpf(cpf),
                () -> new DuplicateKeyException(String.format(STUDENT_WITH_CPF_ALREADY_EXISTS, cpf))
        );
    }

    private void validateStudentCpf(String cpf, Integer id) {
        Functions.acceptTrueThrows(
                this.existsByCpf(cpf, id),
                () -> new DuplicateKeyException(String.format(STUDENT_WITH_CPF_ALREADY_EXISTS, cpf))
        );
    }

    private Aluno findStudentById(Integer id) {
        return this.alunoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(STUDENT_NOT_FOUND));
    }

    private void validateCourseId(Integer cursoId) {
        Functions.ifEmptyThrows(
                cursoId,
                () -> new BadRequestException(COURSE_ID_NOT_INFORMED)
        );
        Functions.acceptFalseThrows(
                this.cursoService.existsActiveById(cursoId),
                () -> new NotFoundException(COURSE_NOT_FOUND)
        );
    }

}
