import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/users/login`, {
            email,
            password,
        });
    }

    signup(email: string, password: string, fullName: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/users/register`, {
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

    saveUserInfo(res: User) {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('email', res.email);
        localStorage.setItem('name', res.name);
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
    }
}
