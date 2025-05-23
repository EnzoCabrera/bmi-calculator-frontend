import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class TrainingsService {
    constructor(private http: HttpClient) {}

    create(): Observable<any> {
        return this.http.post<any>(
            `${environment.apiUrl}/trainings/create`,
            {}
        );
    }

    loadById(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/trainings/by-id`);
    }
}
