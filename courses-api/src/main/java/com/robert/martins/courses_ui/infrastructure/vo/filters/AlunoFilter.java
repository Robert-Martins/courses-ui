package com.robert.martins.courses_ui.infrastructure.vo.filters;

import com.robert.martins.courses_ui.infrastructure.vo.enums.SituacaoAluno;

public record AlunoFilter(
        Integer id,
        String nome,
        String cpf,
        SituacaoAluno situacao,
        Integer cursoId
) {
}
