import { NgModule } from '@angular/core';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesCRUDApiService } from './services/employees-crud-api.service';
import { EmployeesComponent } from './employees.component';
import { EditEmployeeDialogComponent } from './dialogs/edit-employee-dialog/edit-employee-dialog.component';
import { CreateEmployeeDialogComponent } from './dialogs/create-employee-dialog/create-employee-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { EmployeeDialogService } from './services/employees-dialog.service';
import { EmployeePaginationService } from './services/employee-pagination.service';
import { EmployeeNotificationService } from './services/employee-notification.service';
import { EmployeeConfirmationService } from './services/employee-confirmation.service';
import { SharedTableModule } from 'src/app/shared/table/shared-table.module';
import { EmployeeSummaryComponent } from './employee-summary/employee-summary.component';
import { EmployeeSummaryCrudService } from './services/employee-summary-crud.service';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        EmployeesComponent,
        EditEmployeeDialogComponent,
        CreateEmployeeDialogComponent,
        EmployeeSummaryComponent,
    ],
    imports: [EmployeesRoutingModule, SharedTableModule, CalendarModule],
    providers: [
        EmployeesCRUDApiService,
        DialogService,
        ConfirmationService,
        EmployeeDialogService,
        EmployeePaginationService,
        EmployeeNotificationService,
        EmployeeConfirmationService,
        EmployeeSummaryCrudService,
    ],
})
export class EmployeesModule {}
