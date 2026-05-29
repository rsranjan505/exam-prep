import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderMenuService } from '../../services/header-menu.service';
import { MenuItem } from 'src/app/core/models/menu.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink, RouterLinkActive, NgFor, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  menuService = inject(HeaderMenuService)
    menus = this.menuService.menus
    loading = this.menuService.loading

    router = inject(Router);
    auth = inject(AuthService);
    user$ = this.auth.user$;

    isAuthMenuOpen = signal(false);

    @ViewChild('menu') menu!: ElementRef;

    toggleAuthMenu(event: Event) {
      event.stopPropagation(); // prevent instant close
      this.isAuthMenuOpen.update(v => !v);
    }

    closeAuthMenu() {
      this.isAuthMenuOpen.set(false);
    }

    logout() {
      this.auth.logout();
      this.closeMenu();
      this.router.navigate(['/home']);
    }


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
