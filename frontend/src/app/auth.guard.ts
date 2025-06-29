import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    isAuth: boolean = false;
  constructor(private router: Router,private authService:AuthService)  {
          
        }

  canActivate(): boolean {
        
        this.authService.verif().subscribe({
            next: () => {
            this.isAuth = true;
            },
            error: () => {
                this.isAuth = false;
                this.router.navigate(['/login']);
            }
          });
          
        
          
        return this.isAuth;
        }
  }

