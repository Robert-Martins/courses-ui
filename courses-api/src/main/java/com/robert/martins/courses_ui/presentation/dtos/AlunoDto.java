package com.robert.martins.courses_ui.presentation.dtos;

import com.robert.martins.courses_ui.domain.models.Aluno;
import com.robert.martins.courses_ui.infrastructure.base.BaseEntityDto;
import com.robert.martins.courses_ui.infrastructure.vo.enums.SituacaoAluno;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AlunoDto extends BaseEntityDto<Aluno> {

    @NotNull
    @NotEmpty
    @Size(min = 10, max = 100)
    private String nome;

    @NotNull
    private LocalDate dataNascimento;

    @NotNull
    @NotEmpty
    @Size(min = 11, max = 11)
    private String cpf;

    @NotNull
    private SituacaoAluno situacao;


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
