import { Component } from '@angular/core';
import { EmployeesCRUDApiService } from './services/employees-crud-api.service';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeDialogService } from './services/employees-dialog.service';
import { EmployeePaginationService } from './services/employee-pagination.service';
import { EmployeeNotificationService } from './services/employee-notification.service';
import { EmployeeConfirmationService } from './services/employee-confirmation.service';
import { BaseCrudTableComponent } from 'src/app/shared/base-table/base-components/base-crud-table.component';
import { Router } from '@angular/router';
import { AppSplitButtonComponent } from '../../shared/app-split-button/app-split-button.component';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss',
    standalone: true,
    imports: [
        ToastModule,
        ConfirmDialogModule,
        TableModule,
        SharedModule,
        ButtonModule,
        NgFor,
        AppSplitButtonComponent,
    ],
})
export class EmployeesComponent extends BaseCrudTableComponent<Employee> {
    public columns = [
        { field: 'firstname', header: 'First Name' },
        { field: 'surname', header: 'Surname' },
        { field: 'email', header: 'Email' },
        { field: 'username', header: 'Username' },
        { field: 'role', header: 'Role' },
        { field: 'employment_status', header: 'Employment Status' },
    ];

    constructor(
        confirmationService: EmployeeConfirmationService,
        dialogService: EmployeeDialogService,
        crudService: EmployeesCRUDApiService,
        paginationService: EmployeePaginationService,
        notificationService: EmployeeNotificationService,
        private router: Router
    ) {
        super(
            dialogService,
            crudService,
            paginationService,
            notificationService,
            confirmationService
        );
    }

    public getEmployeeSummary(employee: Employee) {
        this.router.navigate([
            'features/employees/employee-summary',
            employee._id,
        ]);
    }
}
