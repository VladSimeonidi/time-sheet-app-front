import { Component, OnInit } from '@angular/core';
import { EmployeeSummaryCrudService } from '../services/employee-summary-crud.service';
import { ActivatedRoute } from '@angular/router';
import {
    EmployeeSummaryResponse,
    SummaryEmployee,
} from 'src/app/interfaces/employee-summary';
import { Employee } from 'src/app/interfaces/employee';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

interface Column {
    field: string;
    header: string;
}
@Component({
    selector: 'app-employee-summary',
    templateUrl: './employee-summary.component.html',
    styleUrl: './employee-summary.component.scss',
    standalone: true,
    imports: [
        CalendarModule,
        FormsModule,
        NgFor,
        TableModule,
        SharedModule,
        DatePipe,
    ],
})
export class EmployeeSummaryComponent implements OnInit {
    public dateRange: {
        startDate: string;
        endDate: string;
    };
    public selectedMonth: Date;

    public loading: boolean = false;

    public cols: Column[] = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' },
    ];
    public weeklySummary: SummaryEmployee[];

    public employee: Employee;

    constructor(
        private employeeSummaryCrudService: EmployeeSummaryCrudService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        const employeeId = this.route.snapshot.paramMap.get('id') || '';

        this.selectedMonth = new Date();

        const { firstDay, lastDay } = this.getFirstAndLastDay(
            this.selectedMonth
        );

        this.dateRange = {
            startDate: firstDay,
            endDate: lastDay,
        };

        this.getEmployeeSummary(employeeId);
    }

    public onMonthSelect(selectedMonth: Date) {
        const { firstDay, lastDay } = this.getFirstAndLastDay(selectedMonth);

        this.dateRange = {
            startDate: firstDay,
            endDate: lastDay,
        };

        this.getEmployeeSummary(this.employee._id);
    }

    get fullName(): string {
        return this.employee
            ? `${this.employee.firstname} ${this.employee.surname}`
            : '';
    }

    private getEmployeeSummary(employeeId) {
        this.loading = true;
        this.employeeSummaryCrudService
            .getSummary(employeeId, this.dateRange)
            .subscribe({
                next: (response: EmployeeSummaryResponse) => {
                    this.weeklySummary = response.weeklySummary;
                    this.employee = response.employee;
                    this.loading = false;
                },
                error: (err) => {
                    this.loading = false;
                    console.warn(err);
                },
            });
    }

    private getFirstAndLastDay(date: Date): {
        firstDay: string;
        lastDay: string;
    } {
        const year = date.getFullYear();
        const month = date.getMonth();

        return {
            firstDay: new Date(year, month, 1).toISOString(),
            lastDay: new Date(year, month + 1, 0).toISOString(),
        };
    }
}
