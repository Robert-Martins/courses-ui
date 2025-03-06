export class Aluno {

    constructor(
        public id: number = null,
        public nome: string = null,
        public cpf: string = null,
        public dataNascimento: Date = null,
        public situacao: string = null,
        public cursoId: number = null,
        public updatedAt: Date = null,
        public createdAt: Date = null
    ) { }

}