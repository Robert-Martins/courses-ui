export class Curso {

    constructor(
        public id: number = null,
        public nome: string = null,
        public inicioAulas: Date = null,
        public fimAulas: Date = null,
        public ativo: boolean = null,
        public updatedAt: Date = null,
        public createdAt: Date = null
    ) { }

}