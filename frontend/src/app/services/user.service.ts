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
export class UserService {
  private apiUrl = 'http://localhost:8081/users'; // Adjust the URL as needed

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

  getUser(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/auth`, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/users/del/${id}`, { headers });
  }

  
  numPro(): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http.get<number>(`${this.apiUrl}/numProduit`, { headers });
  }
  numCat(): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http.get<number>(`${this.apiUrl}/numCategorie`, { headers });
  }
  count(){
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/count`, { headers });
  }
  loadpath(pathimage: string) {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/pathimage`, { pathimage }, { headers, responseType: 'text' });
  }
}