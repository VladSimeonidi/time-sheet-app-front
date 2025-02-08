import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Leave } from 'src/app/interfaces/leave';
import { BaseDialogService } from 'src/app/shared/base-table/base-services/base-dialog.service';
import { LeaveCRUDApiService } from './leave-crud-api.service';
import { LeaveNotificationService } from './leave-notification.service';
import { CreateLeaveDialogComponent } from '../dialogs/create-leave-dialog/leave-dialog-create.component';
import { EditLeaveDialogComponent } from '../dialogs/edit-leave-dialog/edit-leave-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class LeaveDialogService extends BaseDialogService<Leave> {
    constructor(
        dialogService: DialogService,
        crudService: LeaveCRUDApiService,
        notificationService: LeaveNotificationService
    ) {
        super(dialogService, crudService, notificationService, 'leave');
    }

    protected getCreateDialogComponent() {
        return CreateLeaveDialogComponent;
    }
    protected getCreateDialogConfig() {
        return {
            header: 'Create Leave',
            width: '50%',
            closeOnEscape: true,
        };
    }
    protected getEditDialogComponent() {
        return EditLeaveDialogComponent;
    }
    protected getEditDialogConfig(item: Leave) {
        return {
            header: 'Edit Leave',
            width: '50%',
            closeOnEscape: true,
            data: { item },
        };
    }
}
