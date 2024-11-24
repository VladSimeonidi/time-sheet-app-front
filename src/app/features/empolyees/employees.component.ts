import { Component } from '@angular/core';
import { EmployeesApiService } from './services/employees-api.service';
import { Employee } from 'src/app/interfaces/employee';
import { BaseListComponent } from 'src/app/shared/base-table/base-components/base-list.component';
import { EmployeeDialogService } from './services/employees-dialog.service';
import { EmployeePaginationService } from './services/employee-pagination.service';
import { EmployeeNotificationService } from './services/employee-notification.service';
import { EmployeeConfirmationService } from './services/employee-confirmation.service';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss',
})
export class EmployeesComponent extends BaseListComponent<Employee> {
    public columns = [
        { field: 'firstname', header: 'First Name' },
        { field: 'surname', header: 'Surname' },
        { field: 'email', header: 'Email' },
        { field: 'username', header: 'Username' },
        { field: 'role', header: 'Role' },
        { field: 'employment_status', header: 'Employment Status' },
    ];

    constructor(
        protected override confirmationService: EmployeeConfirmationService,
        protected override dialogService: EmployeeDialogService,
        protected override crudService: EmployeesApiService,
        protected override paginationService: EmployeePaginationService,
        protected override notificationService: EmployeeNotificationService
    ) {
        super(
            dialogService,
            crudService,
            paginationService,
            notificationService,
            confirmationService
        );
    }
}
