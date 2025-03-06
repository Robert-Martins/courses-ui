package com.robert.martins.courses_ui.domain.repositories;

import com.robert.martins.courses_ui.domain.models.Aluno;
import com.robert.martins.courses_ui.infrastructure.vo.enums.SituacaoAluno;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

    Boolean existsByCpf(String cpf);

    Boolean existsByCpfAndIdNot(String cpf, Integer id);

    @Modifying
    @Query(
            value = "UPDATE tb_alunos SET curso_id = :cursoId WHERE id = :id",
            nativeQuery = true
    )
    void enroll(
            @Param("id") Integer id,
            @Param("cursoId") Integer cursoId
    );

    @Query(
            value = "SELECT * FROM tb_alunos a " +
                    "WHERE " +
                    "(:id IS NULL OR a.id = :id) AND " +
                    "(:nome IS NULL OR :nome = '' OR a.nome ILIKE CONCAT('%', :nome, '%')) AND " +
                    "(:dataNascimento IS NULL OR a.data_nascimento = :dataNascimento) AND " +
                    "(:cpf IS NULL OR :cpf = '' OR a.cpf = :cpf) AND " +
                    "(:situacao IS NULL OR a.situacao = :situacao) AND " +
                    "(:cursoId IS NULL OR a.curso_id = :cursoId)",
            nativeQuery = true
    )
    Page<Aluno> findAll(
            Pageable pageable,
            @Param("id") Integer id,
            @Param("nome") String nome,
            @Param("dataNascimento") LocalDate dataNascimento,
            @Param("cpf") String cpf,
            @Param("situacao") SituacaoAluno situacao,
            @Param("cursoId") Integer cursoId
    );

}
