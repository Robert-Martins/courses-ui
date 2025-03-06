package com.robert.martins.courses_ui.infrastructure.vo.filters;

import java.time.LocalDateTime;

public record CursoFilter(
        Integer id,
        String nome,
        LocalDateTime inicioAulas,
        LocalDateTime fimAulas,
        Boolean ativo
) {
}
