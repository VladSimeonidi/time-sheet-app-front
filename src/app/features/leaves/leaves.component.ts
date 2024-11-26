import { Component } from '@angular/core';
import { Leave } from 'src/app/interfaces/leave';
import { BaseListComponent } from 'src/app/shared/base-table/base-components/base-list.component';
import { LeaveConfirmationService } from './services/leave-confirmation.service';
import { LeaveDialogService } from './services/leave-dialog.service';
import { LeaveApiService } from './services/leave-api.service';
import { LeavePaginationService } from './services/leave-pagination.service';
import { LeaveNotificationService } from './services/leave-notification.service';

@Component({
    selector: 'app-leaves',
    templateUrl: './leaves.component.html',
    styleUrl: './leaves.component.scss',
})
export class LeavesComponent extends BaseListComponent<Leave> {
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
        protected override confirmationService: LeaveConfirmationService,
        protected override dialogService: LeaveDialogService,
        protected override crudService: LeaveApiService,
        protected override paginationService: LeavePaginationService,
        protected override notificationService: LeaveNotificationService
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
