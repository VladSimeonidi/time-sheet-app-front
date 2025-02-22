import { Component } from '@angular/core';
import { BaseLeavesDialogComponent } from '../base-component/base-leaves-dialog.component';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Leave } from 'src/app/interfaces/leave';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { UnavailableDatesApiService } from 'src/app/shared/unavailable-dates/unavailable-dates-api-service';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { NgIf } from '@angular/common';
import { EmployeeSelectComponent } from '../../../../shared/employee-select/employee-select/employee-select.component';

@Component({
    selector: 'app-edit-leave-dialog',
    templateUrl: './edit-leave-dialog.component.html',
    styleUrl: './edit-leave-dialog.component.scss',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        EmployeeSelectComponent,
        NgIf,
        CalendarModule,
        DropdownModule,
        SharedModule,
        ButtonModule,
    ],
})
export class EditLeaveDialogComponent extends BaseLeavesDialogComponent {
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        fb: FormBuilder,
        unavailableDatesApiService: UnavailableDatesApiService
    ) {
        super(fb, unavailableDatesApiService);
    }
    protected initializeData(): void {
        this.data = { ...this.config.data.item };
    }
    protected saveData(item: Partial<Leave>): void {
        this.ref.close({ data: item, action: DialogAction.EDIT });
    }
    protected cancelData(): void {
        this.ref.close({ action: DialogAction.CANCEL });
    }
    protected buildForm(): FormGroup {
        return this.fb.group({
            employee: [this.data.employee, Validators.required],
            start_date: [new Date(this.data.start_date), Validators.required],
            end_date: [new Date(this.data.end_date), [Validators.required]],
            status: [this.data.status, Validators.required],
            leave_type: [this.data.leave_type, Validators.required],
        });
    }
}
