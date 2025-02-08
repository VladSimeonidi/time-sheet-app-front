import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { BaseDialogService } from 'src/app/shared/base-table/base-services/base-dialog.service';
import { CreateTimeSheetDialogComponent } from '../dialogs/create-timesheet-dialog/create-timesheet-dialog.component';
import { TimeSheetsNotificationService } from './timesheets-notification.service';
import { TimeSheetsCRUDApiService } from './timesheets-crud-api.service';
import { EditTimeSheetDialogComponent } from '../dialogs/edit-timesheet-dialog/edit-timesheet-dialog.component';

@Injectable()
export class TimeSheetsDialogService extends BaseDialogService<TimeSheet> {
    constructor(
        dialogService: DialogService,
        crudService: TimeSheetsCRUDApiService,
        notificationService: TimeSheetsNotificationService
    ) {
        super(dialogService, crudService, notificationService, 'timesheet');
    }

    protected getCreateDialogComponent() {
        return CreateTimeSheetDialogComponent;
    }

    protected getCreateDialogConfig() {
        return {
            header: 'Create Time Sheet',
            width: '50%',
            closeOnEscape: true,
        };
    }

    protected getEditDialogComponent() {
        return EditTimeSheetDialogComponent;
    }
    protected getEditDialogConfig(timesheet: TimeSheet) {
        return {
            header: 'Edit Time Sheet',
            width: '50%',
            closeOnEscape: true,
            data: { timesheet },
        };
    }
}
