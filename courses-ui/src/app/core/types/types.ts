export type Enum = {
    name: string;
    description: string;
}

export type ApplicationError = {
    error: any | CoursesApplicationError;
}

export type CoursesApplicationError = {
    title: string;
    status: number;
    details: string;
    developerMessage: string;
    className: string;
    timestamp: Date;
}

export type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export type Sort = {
    sort: string;
    direction: string;
}

export type AlunoFilter = {
    id?: number;
    nome?: string;
    cpf?: string;
    dataNascimento?: Date;
    situacao?: string;
    cursoId?: number;
}

export type CursoFilter = {
    id?: number;
    nome?: string;
    inicioAulas?: Date;
    fimAulas?: Date;
    ativo?: boolean;
}