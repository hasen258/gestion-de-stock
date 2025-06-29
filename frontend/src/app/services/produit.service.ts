import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'http://localhost:8081/produits'; // Adjust the URL as needed

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

  getProduits(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    console.log(headers);
    return this.http.get<any[]>(this.apiUrl+"/user", { headers });
  }

  getProduit(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  addProduit(produit: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/add-dto`, produit, { headers});
  }

  deleteProduit(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.apiUrl}/del/${id}`, { headers});
  }

  getProduitByCategorie(categorie: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/categorie/${categorie}`, { headers });
  }
  getIdProduitByCat(categorie: Number): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/cat/${categorie}`, { headers });
  }
  getProduitBynames(name: string): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/${name}`, { headers});
  }
  getProduitByUser(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/user`, { headers });
  }
  updateProduit(item:any,id:number){
    const headers = this.getAuthHeaders();
    return this.http.patch<any>(`${this.apiUrl}/update/${id}`,item, { headers });
  }
  
}