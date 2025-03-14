package com.robert.martins.courses_ui.domain.models;

import com.robert.martins.courses_ui.infrastructure.base.BaseEntity;
import com.robert.martins.courses_ui.infrastructure.vo.enums.SituacaoAluno;
import com.robert.martins.courses_ui.presentation.dtos.AlunoDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "tb_alunos")
public class Aluno extends BaseEntity {

    @Column(name = "nome")
    private String nome;

    @Column(name = "data_nascimento")
    private LocalDateTime dataNascimento;

    @Column(name = "cpf")
    private String cpf;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao")
    private SituacaoAluno situacao;

    @Override
    public AlunoDto mapEntityToDto() {
        AlunoDto alunoDto = new AlunoDto();
        alunoDto.setId(this.getId());
        alunoDto.setNome(this.getNome());
        alunoDto.setDataNascimento(this.getDataNascimento());
        alunoDto.setCpf(this.getCpf());
        alunoDto.setSituacao(this.getSituacao());
        alunoDto.setUpdatedAt(this.getUpdatedAt());
        alunoDto.setCreatedAt(this.getCreatedAt());
        return alunoDto;
    }

}
