import { Injectable } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { CreateEmployeeDialogComponent } from '../dialogs/create-employee-dialog/create-employee-dialog.component';
import { EditEmployeeDialogComponent } from '../dialogs/edit-employee-dialog/edit-employee-dialog.component';
import { BaseDialogService } from 'src/app/shared/base-table/base-services/base-dialog.service';
import { EmployeesCRUDApiService } from './employees-crud-api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { EmployeeNotificationService } from './employee-notification.service';

@Injectable()
export class EmployeeDialogService extends BaseDialogService<Employee> {
    constructor(
        protected override dialogService: DialogService,
        protected override crudService: EmployeesCRUDApiService,
        protected override notificationService: EmployeeNotificationService
    ) {
        super(dialogService, crudService, notificationService, 'employee');
    }

    protected getCreateDialogComponent() {
        return CreateEmployeeDialogComponent;
    }

    protected getCreateDialogConfig() {
        return {
            header: 'Create Employee',
            width: '50%',
            closeOnEscape: true,
        };
    }

    protected getEditDialogComponent() {
        return EditEmployeeDialogComponent;
    }

    protected getEditDialogConfig(employee: Employee) {
        return {
            header: 'Edit Employee',
            width: '50%',
            closeOnEscape: true,
            data: { employee },
        };
    }
}
