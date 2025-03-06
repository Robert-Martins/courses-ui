package com.robert.martins.courses_ui.infrastructure.vo.filters;

import com.robert.martins.courses_ui.infrastructure.vo.enums.SituacaoAluno;

import java.time.LocalDate;

public record AlunoFilter(
        Integer id,
        String nome,
        LocalDate dataNascimento,
        String cpf,
        SituacaoAluno situacao,
        Integer cursoId
) {
}
