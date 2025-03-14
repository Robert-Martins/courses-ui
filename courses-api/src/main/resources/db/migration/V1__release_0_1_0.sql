/*===========================================================*/
/* TABLE: TB_CURSOS                                          */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS TB_CURSOS (
    ID              BIGSERIAL,
    NOME            TEXT                NOT NULL,
    INICIO_AULAS    TIMESTAMP           NOT NULL,
    FIM_AULAS       TIMESTAMP           NOT NULL,
    ATIVO           BOOLEAN             NOT NULL DEFAULT TRUE,

    CREATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ID)
);

/*===========================================================*/
/* TABLE: TB_ALUNOS                                          */
/*===========================================================*/

CREATE TABLE IF NOT EXISTS TB_ALUNOS (
    ID              BIGSERIAL,
    NOME            TEXT                NOT NULL,
    DATA_NASCIMENTO TIMESTAMP           NOT NULL,
    CPF             VARCHAR(11)         NOT NULL UNIQUE,
    SITUACAO        VARCHAR(50)         NOT NULL,

    ID_CURSO        BIGINT,

    CREATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT      TIMESTAMP           NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT FK_CURSO FOREIGN KEY (ID_CURSO) REFERENCES TB_CURSOS(ID) ON DELETE CASCADE
);

CREATE INDEX idx_alunos_id_curso ON TB_ALUNOS (ID_CURSO);