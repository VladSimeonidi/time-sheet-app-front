import { NgModule } from '@angular/core';
import { TimeSheetRoutingModule } from './timesheets-routing.module';
import { BaseTableModule } from 'src/app/shared/base-table/base-table.module';
import { CreateTimeSheetDialogComponent } from './dialogs/create-timesheet-dialog/create-timesheet-dialog.component';
import { TimeSheetsComponent } from './timesheets.component';
import { TimeSheetsApiService } from './services/timesheets-api.service';
import { TimeSheetsConfirmationService } from './services/timesheets-confirmation.service';
import { TimeSheetsDialogService } from './services/timesheets-dialog.service';
import { TimeSheetsNotificationService } from './services/timesheets-notification.service';
import { TimeSheetPaginationService } from './services/timesheets-pagination.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { EmployeeSelectModule } from 'src/app/shared/employee-select/employee-select.module';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { EditTimeSheetDialogComponent } from './dialogs/edit-timesheet-dialog/edit-timesheet-dialog.component';

@NgModule({
    declarations: [
        CreateTimeSheetDialogComponent,
        EditTimeSheetDialogComponent,
        TimeSheetsComponent,
    ],
    imports: [
        BaseTableModule,
        TimeSheetRoutingModule,
        EmployeeSelectModule,
        CalendarModule,
        CheckboxModule,
    ],
    providers: [
        TimeSheetsApiService,
        TimeSheetsConfirmationService,
        TimeSheetsDialogService,
        TimeSheetsNotificationService,
        TimeSheetPaginationService,
        DialogService,
        ConfirmationService,
    ],
})
export class TimeSheetsModule {}
