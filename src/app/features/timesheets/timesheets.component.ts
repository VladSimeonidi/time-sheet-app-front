import { Component } from '@angular/core';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { BaseTableComponent } from 'src/app/shared/base-table/base-components/base-table.component';
import { TimeSheetsConfirmationService } from './services/timesheets-confirmation.service';
import { TimeSheetPaginationService } from './services/timesheets-pagination.service';
import { TimeSheetsNotificationService } from './services/timesheets-notification.service';
import { TimeSheetsDialogService } from './services/timesheets-dialog.service';
import { TimeSheetsCRUDApiService } from './services/timesheets-crud-api.service';
import { BaseCrudTableComponent } from 'src/app/shared/base-table/base-components/base-crud-table.component';
import { Employee } from 'src/app/interfaces/employee';

@Component({
    selector: 'app-timesheet',
    templateUrl: './timesheets.component.html',
    styleUrl: './timesheets.component.scss',
})
export class TimeSheetsComponent extends BaseCrudTableComponent<TimeSheet> {
    public columns = [
        { field: '', header: 'FIRST_NAME' },
        { field: '', header: 'SURNAME' },
        { field: 'date', header: 'DATE' },
        { field: 'start_time', header: 'START_TIME' },
        { field: 'end_time', header: 'END_TIME' },
        { field: 'breaks', header: 'BREAKS' },
        { field: 'total_hours_worked', header: 'TOTAL_HOURS_WORKED' },
        { field: 'timesheet_status', header: 'TIMESHEET_STATUS' },
        { field: '', header: 'ACTIONS' },
    ];
    constructor(
        confirmationService: TimeSheetsConfirmationService,
        dialogService: TimeSheetsDialogService,
        crudService: TimeSheetsCRUDApiService,
        paginationService: TimeSheetPaginationService,
        notificationService: TimeSheetsNotificationService
    ) {
        super(
            dialogService,
            crudService,
            paginationService,
            notificationService,
            confirmationService
        );
    }

    public onEmployeeSelected($event: Employee) {
        this.queryParams = { employeeId: $event._id };
        const lastEvent = this.paginationService.getLastPaginationEvent();
        this.loadItems(lastEvent);
    }
}
