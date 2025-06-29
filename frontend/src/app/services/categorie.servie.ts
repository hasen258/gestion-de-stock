import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = 'http://localhost:8081/categories'; // Adjust the URL as needed

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
  
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/user", { headers: this.getAuthHeaders() });
  }

  getCategorie(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addCategorie(categorie: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, categorie, { headers: this.getAuthHeaders() });
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/del/${id}`, { headers: this.getAuthHeaders() });
  }
  updateCategorie(id:number,item:any){
    return this.http.patch<any>(`${this.apiUrl}/update/${id}`,item ,{ headers: this.getAuthHeaders() });
  }
}