import { Component } from '@angular/core';
import { Leave } from 'src/app/interfaces/leave';
import { BaseTableComponent } from 'src/app/shared/base-table/base-components/base-table.component';
import { LeaveConfirmationService } from './services/leave-confirmation.service';
import { LeaveDialogService } from './services/leave-dialog.service';
import { LeaveApiService } from './services/leave-api.service';
import { LeavePaginationService } from './services/leave-pagination.service';
import { LeaveNotificationService } from './services/leave-notification.service';
import { BaseCrudTableComponent } from 'src/app/shared/base-table/base-components/base-crud-table.component';

@Component({
    selector: 'app-leaves',
    templateUrl: './leaves.component.html',
    styleUrl: './leaves.component.scss',
})
export class LeavesComponent extends BaseCrudTableComponent<Leave> {
    public columns = [
        {
            field: 'firstname',
            header: 'First Name',
            resolver: (rowData: any) => rowData.employee?.firstname,
        },
        {
            field: 'surname',
            header: 'Surname',
            resolver: (rowData: any) => rowData.employee?.surname,
        },
        {
            field: 'leave_type',
            header: 'Leave Type',
        },
        {
            field: 'start_date',
            header: 'Start Date',
        },
        {
            field: 'end_date',
            header: 'End Date',
        },
        {
            field: 'status',
            header: 'Status',
        },
    ];

    constructor(
        confirmationService: LeaveConfirmationService,
        dialogService: LeaveDialogService,
        crudService: LeaveApiService,
        paginationService: LeavePaginationService,
        notificationService: LeaveNotificationService
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
