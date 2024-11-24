import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SickLeave } from 'src/app/interfaces/sick-leaves';
import { BaseDialogService } from 'src/app/shared/base-table/base-services/base-dialog.service';
import { SickLeaveApiService } from './sick-leave-api.service';
import { SickLeaveNotificationService } from './sick-leave-notification.service';

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
        throw new Error('Method not implemented.');
    }
    protected override getCreateDialogConfig() {
        throw new Error('Method not implemented.');
    }
    protected override getEditDialogComponent() {
        throw new Error('Method not implemented.');
    }
    protected override getEditDialogConfig(item: SickLeave) {
        throw new Error('Method not implemented.');
    }
}
