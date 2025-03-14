import { Routes } from '@angular/router';
import { CursosComponent } from './views/cursos/cursos.component';
import { AlunosComponent } from './views/alunos/alunos.component';

export const routes: Routes = [
    {
        path: '',
        component: CursosComponent
    },
    {
        path: 'alunos',
        component: AlunosComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
