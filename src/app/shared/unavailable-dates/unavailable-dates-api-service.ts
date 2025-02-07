import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UnavailableDatesApiService {
    private apiUrl = `http://localhost:3000/api/unavailable-dates`;
    constructor(private http: HttpClient) {}

    public getAllUnavailableDates(id: string): Observable<Date[]> {
        return this.http.get<Date[]>(`${this.apiUrl}/${id}`);
    }
}
