import { NgModule } from '@angular/core';
import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './leaves.component';
import { LeaveConfirmationService } from './services/leave-confirmation.service';
import { LeaveNotificationService } from './services/leave-notification.service';
import { LeavePaginationService } from './services/leave-pagination.service';
import { LeaveCRUDApiService } from './services/leave-crud-api.service';
import { LeaveDialogService } from './services/leave-dialog.service';

import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateLeaveDialogComponent } from './dialogs/create-leave-dialog/leave-dialog-create.component';
import { EditLeaveDialogComponent } from './dialogs/edit-leave-dialog/edit-leave-dialog.component';
import { EmployeeSelectModule } from 'src/app/shared/employee-select/employee-select.module';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { UnavailableDatesApiService } from 'src/app/shared/unavailable-dates/unavailable-dates-api-service';

@NgModule({
    imports: [
    LeavesRoutingModule,
    EmployeeSelectModule,
    CalendarModule,
    LeavesComponent,
    CreateLeaveDialogComponent,
    EditLeaveDialogComponent,
],
    providers: [
        LeaveConfirmationService,
        LeaveNotificationService,
        LeavePaginationService,
        LeaveCRUDApiService,
        LeaveDialogService,
        DialogService,
        ConfirmationService,
        DatePipe,
        UnavailableDatesApiService,
    ],
})
export class LeavesModule {}
