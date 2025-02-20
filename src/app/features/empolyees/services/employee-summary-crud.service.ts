import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryEmployee } from 'src/app/interfaces/employee-summary';

@Injectable()
export class EmployeeSummaryCrudService {
    private apiUrl: string = 'http://localhost:3000/api/employees/summary';

    constructor(protected http: HttpClient) {}

    getSummary(
        employeeId: string,
        range: { startDate: string; endDate: string }
    ): Observable<{ id: string; weeklySummary: SummaryEmployee[] }> {
        let params = new HttpParams();

        if (range.startDate) params = params.set('startDate', range.startDate);
        if (range.endDate) params = params.set('endDate', range.endDate);

        return this.http.get<{ id: string; weeklySummary: SummaryEmployee[] }>(
            `${this.apiUrl}/${employeeId}`,
            { params }
        );
    }
}
