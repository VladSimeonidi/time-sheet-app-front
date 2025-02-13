import { Component } from '@angular/core';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { BaseTableComponent } from 'src/app/shared/base-table/base-components/base-table.component';
import { TimeSheetsConfirmationService } from './services/timesheets-confirmation.service';
import { TimeSheetPaginationService } from './services/timesheets-pagination.service';
import { TimeSheetsNotificationService } from './services/timesheets-notification.service';
import { TimeSheetsDialogService } from './services/timesheets-dialog.service';
import { TimeSheetsCRUDApiService } from './services/timesheets-crud-api.service';
import { BaseCrudTableComponent } from 'src/app/shared/base-table/base-components/base-crud-table.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-timesheet',
    templateUrl: './timesheets.component.html',
    styleUrl: './timesheets.component.scss',
})
export class TimeSheetsComponent extends BaseCrudTableComponent<TimeSheet> {
    public columns = [
        { field: '', header: 'First Name' },
        { field: '', header: 'Surname' },
        { field: 'date', header: 'Date' },
        { field: 'start_time', header: 'Start Time' },
        { field: 'end_time', header: 'End Time' },
        { field: 'breaks', header: 'Breaks' },
        { field: 'total_hours_worked', header: 'Total Hours Worked' },
        { field: 'timesheet_status', header: 'Timesheet Status' },
        { field: '', header: 'Delete' },
    ];
    constructor(
        confirmationService: TimeSheetsConfirmationService,
        dialogService: TimeSheetsDialogService,
        crudService: TimeSheetsCRUDApiService,
        paginationService: TimeSheetPaginationService,
        notificationService: TimeSheetsNotificationService,
        router: Router
    ) {
        super(
            dialogService,
            crudService,
            paginationService,
            notificationService,
            confirmationService,
            router
        );
    }
}
