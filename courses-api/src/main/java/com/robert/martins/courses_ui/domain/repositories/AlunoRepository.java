package com.robert.martins.courses_ui.domain.repositories;

import com.robert.martins.courses_ui.domain.models.Aluno;
import com.robert.martins.courses_ui.infrastructure.vo.enums.SituacaoAluno;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Integer> {

    Boolean existsByCpf(String cpf);

    Boolean existsByCpfAndIdNot(String cpf, Integer id);

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE tb_alunos SET id_curso = :cursoId WHERE id = :id",
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
                    "(:cpf IS NULL OR :cpf = '' OR a.cpf = :cpf) AND " +
                    "(:situacao IS NULL OR a.situacao = :situacao) AND " +
                    "(:cursoId IS NULL OR a.id_curso = :cursoId)",
            nativeQuery = true
    )
    Page<Aluno> findAll(
            Pageable pageable,
            @Param("id") Integer id,
            @Param("nome") String nome,
            @Param("cpf") String cpf,
            @Param("situacao") String situacao,
            @Param("cursoId") Integer cursoId
    );

    @Query(
            value = "SELECT a.id_curso " +
                    "FROM tb_alunos a " +
                    "WHERE " +
                    "a.id = :id",
            nativeQuery = true
    )
    Optional<Integer> findCourseIdById(Integer id);

}
