import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarService } from '../../services/sidebar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private readonly sidebarService: SidebarService
  ) { }

  public toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

}
