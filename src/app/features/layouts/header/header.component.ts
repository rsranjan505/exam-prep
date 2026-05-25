import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderMenuService } from '../../services/header-menu.service';
import { MenuItem } from 'src/app/core/models/menu.model';

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink, RouterLinkActive, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  menuService = inject(HeaderMenuService)
      menus = this.menuService.menus
    loading = this.menuService.loading
  // menus = signal<MenuItem[]>([])
  // loading = signal<boolean>(false)
  // OnInit() {
  //   this.menus = this.menuService.menus
  //   this.loading = this.menuService.loading

  //   console.log(this.menus())
  // }



  open = false;
  testSeriesOpen = false;

  closeMenu() {
    this.open = false;
    this.testSeriesOpen = false;
  }
}
