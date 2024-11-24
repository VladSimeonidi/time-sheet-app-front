import { NgModule } from '@angular/core';
import { SickLeavesRoutingModule } from './sick-leaves-routing.module';
import { SickLeavesComponent } from './sick-leaves.component';
import { SickLeaveConfirmationService } from './services/sick-leave-confirmation.service';
import { SickLeaveNotificationService } from './services/sick-leave-notification.service';
import { SickLeavePaginationService } from './services/sick-leave-pagination.service';
import { SickLeaveApiService } from './services/sick-leave-api.service';
import { SickLeaveDialogService } from './services/sick-leave-dialog.service';
import { BaseTableModule } from 'src/app/shared/base-table/base-table.module';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [SickLeavesComponent],
    imports: [BaseTableModule, SickLeavesRoutingModule],
    providers: [
        SickLeaveConfirmationService,
        SickLeaveNotificationService,
        SickLeavePaginationService,
        SickLeaveApiService,
        SickLeaveDialogService,
        DialogService,
        ConfirmationService,
    ],
})
export class SickLeavesModule {}
