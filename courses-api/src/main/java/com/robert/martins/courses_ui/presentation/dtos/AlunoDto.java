package com.robert.martins.courses_ui.presentation.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.robert.martins.courses_ui.domain.models.Aluno;
import com.robert.martins.courses_ui.infrastructure.base.BaseEntityDto;
import com.robert.martins.courses_ui.infrastructure.vo.enums.SituacaoAluno;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AlunoDto extends BaseEntityDto<Aluno> {

    @NotNull
    @NotEmpty
    @Size(min = 10, max = 100)
    private String nome;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime dataNascimento;

    @NotNull
    @NotEmpty
    @Size(min = 11, max = 11)
    private String cpf;

    @NotNull
    private SituacaoAluno situacao;

    @NotNull
    private Integer cursoId;

    @Override
    public Aluno mapDtoToEntity() {
        Aluno aluno = new Aluno();
        aluno.setId(this.getId());
        aluno.setNome(this.getNome());
        aluno.setDataNascimento(this.getDataNascimento());
        aluno.setCpf(this.getCpf());
        aluno.setSituacao(this.getSituacao());
        return aluno;
    }
}
