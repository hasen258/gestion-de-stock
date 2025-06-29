import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface LoginResponse {
  token: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/users/auth'; 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return headers;
  }
  verif():Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/verif`, { headers });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { "email":email, "password":password });
  }

  register(userData: UserData): Observable<boolean> {
    
    return this.http.post<boolean>(`${this.apiUrl}/register`, userData);
  }
  modPass(pass:any):Observable<any> {
      const headers = this.getAuthHeaders();
      console.log(pass);
      return this.http.patch<any>(`${this.apiUrl}/modPass`,pass, { headers });
    }
    modName(name:any):Observable<any> {
      const headers = this.getAuthHeaders();
      console.log(name);
      return this.http.patch<any>(`${this.apiUrl}/modName`,name, { headers });
    }
}