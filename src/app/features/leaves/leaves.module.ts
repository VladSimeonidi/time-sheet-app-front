import { NgModule } from '@angular/core';
import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './leaves.component';
import { LeaveConfirmationService } from './services/leave-confirmation.service';
import { LeaveNotificationService } from './services/leave-notification.service';
import { LeavePaginationService } from './services/leave-pagination.service';
import { LeaveApiService } from './services/leave-api.service';
import { LeaveDialogService } from './services/leave-dialog.service';
import { BaseTableModule } from 'src/app/shared/base-table/base-table.module';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [LeavesComponent],
    imports: [BaseTableModule, LeavesRoutingModule],
    providers: [
        LeaveConfirmationService,
        LeaveNotificationService,
        LeavePaginationService,
        LeaveApiService,
        LeaveDialogService,
        DialogService,
        ConfirmationService,
    ],
})
export class LeavesModule {}
