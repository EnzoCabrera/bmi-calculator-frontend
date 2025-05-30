import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class DietsService {
    constructor(private http: HttpClient) {}

    create(intolerances: string[]): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/diets/create`, {
            intolerances,
        });
    }

    loadById(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/diets/by-id`);
    }
}
