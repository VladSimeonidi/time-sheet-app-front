import { Component, OnInit } from '@angular/core';
import { EmployeeSummaryCrudService } from '../services/employee-summary-crud.service';
import { ActivatedRoute } from '@angular/router';
import { SummaryEmployee } from 'src/app/interfaces/employee-summary';
import { Observable } from 'rxjs';

interface Column {
    field: string;
    header: string;
}
@Component({
    selector: 'app-employee-summary',
    templateUrl: './employee-summary.component.html',
    styleUrl: './employee-summary.component.scss',
})
export class EmployeeSummaryComponent implements OnInit {
    public cols: Column[] = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' },
    ];
    public weeklySummary: SummaryEmployee[];

    constructor(
        private employeeSummaryCrudService: EmployeeSummaryCrudService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        const employeeId = this.route.snapshot.paramMap.get('id') || '';

        this.employeeSummaryCrudService
            .getSummary(employeeId, {
                startDate: '2025-02-03',
                endDate: '2025-02-28',
            })
            .subscribe({
                next: (response) => {
                    this.weeklySummary = response.weeklySummary;
                },
                error: (err) => console.warn(err),
            });
    }
}
