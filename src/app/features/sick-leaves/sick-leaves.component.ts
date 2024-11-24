import { Component } from '@angular/core';
import { SickLeave } from 'src/app/interfaces/sick-leaves';
import { BaseListComponent } from 'src/app/shared/base-table/base-components/base-list.component';
import { SickLeaveConfirmationService } from './services/sick-leave-confirmation.service';
import { SickLeaveDialogService } from './services/sick-leave-dialog.service';
import { SickLeaveApiService } from './services/sick-leave-api.service';
import { SickLeavePaginationService } from './services/sick-leave-pagination.service';
import { SickLeaveNotificationService } from './services/sick-leave-notification.service';

@Component({
    selector: 'app-sick-leaves',
    templateUrl: './sick-leaves.component.html',
    styleUrl: './sick-leaves.component.scss',
})
export class SickLeavesComponent extends BaseListComponent<SickLeave> {
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
        protected override confirmationService: SickLeaveConfirmationService,
        protected override dialogService: SickLeaveDialogService,
        protected override crudService: SickLeaveApiService,
        protected override paginationService: SickLeavePaginationService,
        protected override notificationService: SickLeaveNotificationService
    ) {
        super(
            dialogService,
            crudService,
            paginationService,
            notificationService,
            confirmationService
        );
    }

    public getCellValue(rowData: SickLeave, col: any): any {
        return col.resolver ? col.resolver(rowData) : rowData[col.field];
    }
}
