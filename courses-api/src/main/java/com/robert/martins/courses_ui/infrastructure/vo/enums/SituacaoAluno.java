package com.robert.martins.courses_ui.infrastructure.vo.enums;

import com.robert.martins.courses_ui.presentation.dtos.EnumDto;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public enum SituacaoAluno {

    MATRICULADO("Matriculado"),
    TRANCADO("Trancado"),
    DESISTENTE("Desistente"),
    FORMADO("Formado");

    private final String description;

    SituacaoAluno(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static final Set<EnumDto> SITUACAO_ALUNO_ENUM_DTO = buildEnumDto();

    public static Set<EnumDto> buildEnumDto() {
        return Arrays.stream(SituacaoAluno.values())
                .map(situacaoAluno -> {
                    EnumDto enumDto = new EnumDto();
                    enumDto.setName(situacaoAluno.name());
                    enumDto.setDescription(situacaoAluno.getDescription());
                    return enumDto;
                })
                .collect(Collectors.toSet());
    }

}
