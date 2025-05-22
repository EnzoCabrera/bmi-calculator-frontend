import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class AssessmentService {
    constructor(private http: HttpClient) {}
    create(height: number, weight: number): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/bmi/create`, {
            height,
            weight,
        });
    }

    lastBmi(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/bmi/latest-by-id`);
    }
}
