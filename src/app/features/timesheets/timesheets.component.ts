import { Component } from '@angular/core';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { BaseListComponent } from 'src/app/shared/base-table/base-components/base-list.component';
import { TimeSheetsConfirmationService } from './services/timesheets-confirmation.service';
import { TimeSheetPaginationService } from './services/timesheets-pagination.service';
import { TimeSheetsNotificationService } from './services/timesheets-notification.service';
import { TimeSheetsDialogService } from './services/timesheets-dialog.service';
import { TimeSheetsApiService } from './services/timesheets-api.service';

@Component({
    selector: 'app-timesheet',
    templateUrl: './timesheets.component.html',
    styleUrl: './timesheets.component.scss',
})
export class TimeSheetsComponent extends BaseListComponent<TimeSheet> {
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
        protected override confirmationService: TimeSheetsConfirmationService,
        protected override dialogService: TimeSheetsDialogService,
        protected override crudService: TimeSheetsApiService,
        protected override paginationService: TimeSheetPaginationService,
        protected override notificationService: TimeSheetsNotificationService
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
