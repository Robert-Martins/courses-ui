package com.robert.martins.courses_ui.domain.services;

import com.robert.martins.courses_ui.infrastructure.vo.enums.SituacaoAluno;
import com.robert.martins.courses_ui.infrastructure.vo.exception.exceptions.NotFoundException;
import com.robert.martins.courses_ui.presentation.dtos.EnumDto;
import com.robert.martins.courses_ui.presentation.services.IEnumService;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class EnumService implements IEnumService {

    private static final String ENUM_NAO_ENCONTRADO = "Enum não encontrado";

    @Override
    public Set<EnumDto> findEnumByName(String enumName) {
        return switch (enumName) {
            case "SituacaoAluno" -> SituacaoAluno.SITUACAO_ALUNO_ENUM_DTO;
            default -> throw new NotFoundException(ENUM_NAO_ENCONTRADO);
        };
    }

}
