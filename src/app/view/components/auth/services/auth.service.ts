import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/login`, {
            email,
            password,
        });
    }

    signup(email: string, password: string, fullName: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/register`, {
            email,
            password,
            full_name: fullName,
        });
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
