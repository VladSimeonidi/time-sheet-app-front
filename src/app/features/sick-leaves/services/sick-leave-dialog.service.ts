import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SickLeave } from 'src/app/interfaces/sick-leaves';
import { BaseDialogService } from 'src/app/shared/base-table/base-services/base-dialog.service';
import { SickLeaveApiService } from './sick-leave-api.service';
import { SickLeaveNotificationService } from './sick-leave-notification.service';
import { SickLeaveDialogCreateComponent } from '../dialogs/sick-leave-dialog-create/sick-leave-dialog-create.component';
import { EditSickLeaveDialogComponent } from '../dialogs/edit-sick-leave-dialog/edit-sick-leave-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class SickLeaveDialogService extends BaseDialogService<SickLeave> {
    constructor(
        protected override dialogService: DialogService,
        protected override crudService: SickLeaveApiService,
        protected override notificationService: SickLeaveNotificationService
    ) {
        super(dialogService, crudService, notificationService, 'employee');
    }

    protected override getCreateDialogComponent() {
        return SickLeaveDialogCreateComponent;
    }
    protected override getCreateDialogConfig() {
        return {
            header: 'Create Leave',
            width: '50%',
            closeOnEscape: true,
        };
    }
    protected override getEditDialogComponent() {
        return EditSickLeaveDialogComponent;
    }
    protected override getEditDialogConfig(item: SickLeave) {
        return {
            header: 'Edit Leave',
            width: '50%',
            closeOnEscape: true,
            data: { item },
        };
    }
}
