import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Password } from "primeng/password";
import { catchError, map, Observable, switchMap, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          const user = users[0];  // Get the first matching user
          const fakeToken = 'fake-jwt-token'; // Simulated token

          localStorage.setItem('user_id', user.id);
          localStorage.setItem('token', fakeToken);

          return new Observable(observer => {
            observer.next({ access_token: fakeToken });
            observer.complete();
          });
        } else {
          return throwError(() => new Error('Credenciais inválidas'));
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login falhou'));
      })
    );
  }

  signup(email: string, password: string, fullName: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password, full_name: fullName });
  }

}