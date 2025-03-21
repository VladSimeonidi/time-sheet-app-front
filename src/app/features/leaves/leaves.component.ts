import { Component } from '@angular/core';
import { Leave } from 'src/app/interfaces/leave';
import { LeaveConfirmationService } from './services/leave-confirmation.service';
import { LeaveDialogService } from './services/leave-dialog.service';
import { LeaveCRUDApiService } from './services/leave-crud-api.service';
import { LeavePaginationService } from './services/leave-pagination.service';
import { LeaveNotificationService } from './services/leave-notification.service';
import { BaseCrudTableComponent } from 'src/app/shared/base-table/base-components/base-crud-table.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-leaves',
    templateUrl: './leaves.component.html',
    styleUrl: './leaves.component.scss',
})
export class LeavesComponent extends BaseCrudTableComponent<Leave> {
    public columns = [
        {
            field: 'firstname',
            header: 'FIRST_NAME',
            resolver: (rowData: any) => rowData.employee?.firstname,
        },
        {
            field: 'surname',
            header: 'SURNAME',
            resolver: (rowData: any) => rowData.employee?.surname,
        },
        {
            field: 'leave_type',
            header: 'LEAVE_TYPE',
        },
        {
            field: 'start_date',
            header: 'START_DATE',
            resolver: (rowData: any) =>
                rowData.start_date
                    ? this.datePipe.transform(rowData.start_date, 'dd/MM/yyyy')
                    : '',
        },
        {
            field: 'end_date',
            header: 'END_DATE',
            resolver: (rowData: any) =>
                rowData.end_date
                    ? this.datePipe.transform(rowData.end_date, 'dd/MM/yyyy')
                    : '',
        },
        {
            field: 'status',
            header: 'STATUS',
        },
    ];

    constructor(
        confirmationService: LeaveConfirmationService,
        dialogService: LeaveDialogService,
        crudService: LeaveCRUDApiService,
        paginationService: LeavePaginationService,
        notificationService: LeaveNotificationService,
        private datePipe: DatePipe
    ) {
        super(
            dialogService,
            crudService,
            paginationService,
            notificationService,
            confirmationService
        );
    }

    public getCellValue(rowData: Leave, col: any): any {
        return col.resolver ? col.resolver(rowData) : rowData[col.field];
    }
}
