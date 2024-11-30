import { NgModule } from '@angular/core';
import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './leaves.component';
import { LeaveConfirmationService } from './services/leave-confirmation.service';
import { LeaveNotificationService } from './services/leave-notification.service';
import { LeavePaginationService } from './services/leave-pagination.service';
import { LeaveApiService } from './services/leave-api.service';
import { LeaveDialogService } from './services/leave-dialog.service';
import { SharedTableModule } from 'src/app/shared/table/shared-table.module';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateLeaveDialogComponent } from './dialogs/create-leave-dialog/leave-dialog-create.component';
import { EditLeaveDialogComponent } from './dialogs/edit-leave-dialog/edit-leave-dialog.component';
import { EmployeeSelectModule } from 'src/app/shared/employee-select/employee-select.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        LeavesComponent,
        CreateLeaveDialogComponent,
        EditLeaveDialogComponent,
    ],
    imports: [
        SharedTableModule,
        LeavesRoutingModule,
        EmployeeSelectModule,
        CalendarModule,
    ],
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
