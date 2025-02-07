import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseCRUDApiService<T> {
    protected apiUrl: string;

    constructor(protected http: HttpClient, private endpoint: string) {
        this.apiUrl = `http://localhost:3000/api/${this.endpoint}`;
    }

    getAll(): Observable<{ items: T[] }> {
        return this.http.get<{ items: T[] }>(`${this.apiUrl}`);
    }

    getPaginated(
        pageNumber: number,
        pageSize: number
    ): Observable<{ items: T[]; totalRecords: number }> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString());

        return this.http.get<{ items: T[]; totalRecords: number }>(
            `${this.apiUrl}/paginated`,
            { params }
        );
    }

    getById(id: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${id}`);
    }

    create(item: Partial<T>): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}`, item);
    }

    update(id: string, itemUpdated: Partial<T>): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${id}`, itemUpdated);
    }

    delete(id: string): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${id}`);
    }
}
