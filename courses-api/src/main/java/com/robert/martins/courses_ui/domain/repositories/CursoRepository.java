package com.robert.martins.courses_ui.domain.repositories;

import com.robert.martins.courses_ui.domain.models.Curso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Integer> {

    @Query(
            value = "SELECT * FROM tb_cursos c " +
                    "WHERE " +
                    "(:id IS NULL OR c.id = :id) AND " +
                    "(:nome IS NULL OR :nome = '' OR c.nome ILIKE CONCAT('%', :nome, '%')) AND " +
                    "(:inicioAulas IS NULL OR c.inicio_aulas >= :inicioAulas) AND " +
                    "(:fimAulas IS NULL OR c.fim_aulas <= :fimAulas) AND " +
                    "(:ativo IS NULL OR c.ativo = :ativo)",
            nativeQuery = true
    )
    Page<Curso> findAll(
            Pageable pageable,
            @Param("id") Integer id,
            @Param("nome") String nome,
            @Param("inicioAulas") LocalDateTime inicioAulas,
            @Param("fimAulas") LocalDateTime fimAulas,
            @Param("ativo") Boolean ativo
    );

}
