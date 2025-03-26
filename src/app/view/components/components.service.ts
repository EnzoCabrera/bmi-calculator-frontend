import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Password } from "primeng/password";
import { catchError, map, Observable, switchMap, tap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ComponentService {
  private apiUrl = 'http://localhost:8000/users/bmi';

  constructor(private http: HttpClient) { }

  calculateBMI(weight:number, height:number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { weight, height });
  }
}