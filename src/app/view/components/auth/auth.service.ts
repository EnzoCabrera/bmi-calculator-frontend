import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) { }

  

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.access_token && response.user_id) {
            localStorage.setItem('user_id', response.user_id);
            localStorage.setItem('token', response.access_token);
          }
        })
      );
  }


  signup(email: string, password: string, fullName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password, full_name: fullName });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}