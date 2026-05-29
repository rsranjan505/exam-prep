import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authlayout',
  imports: [RouterOutlet, RouterLinkActive, NgIf, RouterLink],
  templateUrl: './authlayout.component.html',
  styleUrl: './authlayout.component.css',
})
export class AuthlayoutComponent {

  mobileMenuOpen = signal(false);
  completedTests = 24;
  totalTests = 56;
  profileMenuOpen = signal(false);

    router = inject(Router);
    auth = inject(AuthService);
    user$ = this.auth.user$;



    user = this.auth.getUser();

    logout() {

      // remove token/session here
      localStorage.removeItem('token');

      // redirect
      window.location.href = '/login';
    }


  closeMenu() {
    this.profileMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {

    const target = event.target as HTMLElement;

    // profile dropdown
    if (!target.closest('.profile-menu-wrapper')) {
      this.profileMenuOpen.set(false);
    }

    // mobile menu
    if (!target.closest('.mobile-menu-wrapper')) {
      this.mobileMenuOpen.set(false);
    }
  }


}
