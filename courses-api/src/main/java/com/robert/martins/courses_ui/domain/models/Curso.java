package com.robert.martins.courses_ui.domain.models;

import com.robert.martins.courses_ui.infrastructure.base.BaseEntity;
import com.robert.martins.courses_ui.presentation.dtos.CursoDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "tb_cursos")
public class Curso extends BaseEntity {

    @Column(name = "nome")
    private String nome;

    @Column(name = "inicio_aulas")
    private LocalDateTime inicioAulas;

    @Column(name = "fim_aulas")
    private LocalDateTime fimAulas;

    @Column(name = "ativo")
    private Boolean ativo;

    @Override
    public CursoDto mapEntityToDto() {
        CursoDto cursoDto = new CursoDto();
        cursoDto.setId(this.getId());
        cursoDto.setNome(this.getNome());
        cursoDto.setInicioAulas(this.getInicioAulas());
        cursoDto.setFimAulas(this.getFimAulas());
        cursoDto.setAtivo(this.getAtivo());
        cursoDto.setUpdatedAt(this.getUpdatedAt());
        cursoDto.setCreatedAt(this.getCreatedAt());
        return cursoDto;
    }
}
