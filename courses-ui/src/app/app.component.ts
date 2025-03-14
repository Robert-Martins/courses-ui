import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/organisms/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './shared/components/organisms/sidebar/sidebar.component';
import { SidebarService } from './shared/components/services/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, MatSidenavModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Courses UI - Sua Plataforma de Gestão de Cursos e Alunos';

  public sidebarOpened: boolean;

  constructor(
    private readonly sidebarService: SidebarService
  ) { 
    this.sidebarService.opened
      .subscribe((opened: boolean) => this.sidebarOpened = opened);
  }

  public toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

}
