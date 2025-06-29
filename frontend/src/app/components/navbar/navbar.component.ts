import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  isProfileDropdownOpen = false;
  isAuth = false;
  private authState = new BehaviorSubject<boolean>(false);
  
  constructor(
    private router: Router, 
    private authService: AuthService,
    public themeService: ThemeService
  ) {
    this.authState.subscribe(state => {
      this.isAuth = state;
    });
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth(): void {
    this.authService.verif().subscribe({
      next: (response) => {
        this.authState.next(response);
      },
      error: () => {
        this.authState.next(false);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!(event.target as HTMLElement).closest('.profile-dropdown')) {
      this.isProfileDropdownOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isProfileDropdownOpen = false;
    }
  }

  toggleProfileDropdown(event: Event): void {
    event.stopPropagation(); 
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    if (this.isProfileDropdownOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  logout(): void {
    localStorage.setItem('token',''); 
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

  title: string = 'My Angular App';
}
