import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8000/users';

  constructor(private http: HttpClient) { }

  signup(email: string, password: string, fullName: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password, full_name: fullName });
  }

}