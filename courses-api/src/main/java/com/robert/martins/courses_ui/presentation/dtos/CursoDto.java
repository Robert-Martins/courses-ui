package com.robert.martins.courses_ui.presentation.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.robert.martins.courses_ui.domain.models.Curso;
import com.robert.martins.courses_ui.infrastructure.base.BaseEntityDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CursoDto extends BaseEntityDto<Curso> {

    @NotNull
    @NotEmpty
    @Size(min = 10, max = 100)
    private String nome;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime inicioAulas;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime fimAulas;

    @NotNull
    private Boolean ativo;

    @Override
    public Curso mapDtoToEntity() {
        Curso curso = new Curso();
        curso.setId(this.getId());
        curso.setNome(this.getNome());
        curso.setInicioAulas(this.getInicioAulas());
        curso.setFimAulas(this.getFimAulas());
        curso.setAtivo(this.getAtivo());
        return curso;
    }
}
