import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationComponent } from '../../components/notification/notification.component';

interface LoginResponse {
  token: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    NotificationComponent
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('notification') notificationComponent!:any;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  error = '';
  isLogin = true;
  hidePassword = true;
  isAuth = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    this.authService.verif().subscribe({
      next: (response) => {
        this.isAuth = response;
        if (this.isAuth) {
          this.router.navigate(['/']);
          
        }
      },
      error: () => {
        this.isAuth = false;
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.error = '';
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: (response: LoginResponse) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.notificationComponent.showNotification('Login Successful', 'You have logged in successfully!');
            setTimeout(() => {
              
              window.location.reload();
              this.router.navigateByUrl('/');
            }, 3000);
          } else {
            this.error = 'Invalid credentials';
            this.notificationComponent.showNotification('Login Failed', 'Invalid credentials');
          }
        },
        error: (error) => {
          this.error = 'Login failed. Please try again.';
          this.notificationComponent.showNotification('Login Failed', 'Login failed. Please try again.');
          console.error('Login error:', error);
        }
      });
    }
  }

  signup() {
    if (this.signupForm.valid) {
      this.error = '';
      const { name, email, password } = this.signupForm.value;
      const userData: UserData = { name: name!, email: email!, password: password! };
      
      this.authService.register(userData).subscribe({
        next: (response) => {
          if (response) {
            this.isLogin = true;
            this.error = '';
            this.notificationComponent.showNotification('Registration Successful', 'Please login.');
            const { email, password } = this.signupForm.value;
            this.authService.login(email!, password!).subscribe({
              next: (response: LoginResponse) => {
                if (response && response.token) {
                  localStorage.setItem('token', response.token);
                  this.notificationComponent.showNotification('Login Successful', 'You have logged in successfully!');
                  setTimeout(() => {
                    
                    window.location.reload();
                    this.router.navigateByUrl('/');
                  }, 3000);
                } else {
                  this.error = 'Invalid credentials';
                  this.notificationComponent.showNotification('Login Failed', 'Invalid credentials');
                }
              },
              error: (error) => {
                this.error = 'Login failed. Please try again.';
                this.notificationComponent.showNotification('Login Failed', 'Login failed. Please try again.');
                console.error('Login error:', error);
              }
            });
            this.signupForm.reset();
          }
          else {
            this.error = 'User already exists';
            this.notificationComponent.showNotification('Registration Failed', 'User already exists');
          }
        },
        error: (error) => {
          this.error = 'Registration failed. Please try again.';
          this.notificationComponent.showNotification('Registration Failed', 'Registration failed. Please try again.');
          console.error('Registration error:', error);
        }
      });
    }
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }
}
