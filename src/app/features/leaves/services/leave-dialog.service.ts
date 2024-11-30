import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Leave } from 'src/app/interfaces/leave';
import { BaseDialogService } from 'src/app/shared/base-table/base-services/base-dialog.service';
import { LeaveApiService } from './leave-api.service';
import { LeaveNotificationService } from './leave-notification.service';
import { CreateLeaveDialogComponent } from '../dialogs/create-leave-dialog/leave-dialog-create.component';
import { EditLeaveDialogComponent } from '../dialogs/edit-leave-dialog/edit-leave-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class LeaveDialogService extends BaseDialogService<Leave> {
    constructor(
        protected override dialogService: DialogService,
        protected override crudService: LeaveApiService,
        protected override notificationService: LeaveNotificationService
    ) {
        super(dialogService, crudService, notificationService, 'leave');
    }

    protected override getCreateDialogComponent() {
        return CreateLeaveDialogComponent;
    }
    protected override getCreateDialogConfig() {
        return {
            header: 'Create Leave',
            width: '50%',
            closeOnEscape: true,
        };
    }
    protected override getEditDialogComponent() {
        return EditLeaveDialogComponent;
    }
    protected override getEditDialogConfig(item: Leave) {
        return {
            header: 'Edit Leave',
            width: '50%',
            closeOnEscape: true,
            data: { item },
        };
    }
}
