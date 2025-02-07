import { Component } from '@angular/core';
import { BaseLeavesDialogComponent } from '../base-component/base-leaves-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Leave } from 'src/app/interfaces/leave';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UnavailableDatesApiService } from 'src/app/shared/unavailable-dates/unavailable-dates-api-service';

@Component({
    selector: 'app-leave-dialog-create',
    templateUrl: './leave-dialog-create.component.html',
    styleUrl: './leave-dialog-create.component.scss',
})
export class CreateLeaveDialogComponent extends BaseLeavesDialogComponent {
    constructor(
        public ref: DynamicDialogRef,
        fb: FormBuilder,
        unavailableDatesApiService: UnavailableDatesApiService
    ) {
        super(fb, unavailableDatesApiService);
    }
    protected initializeData(): void {
        this.data = {
            employee: '',
            start_date: new Date(),
            end_date: new Date(),
            status: '',
            leave_type: '',
        };
    }
    protected saveData(item: Partial<Leave>): void {
        this.ref.close({ data: item, action: DialogAction.CREATE });
    }
    protected cancelData(): void {
        this.ref.close({ action: DialogAction.CANCEL });
    }
    protected buildForm(): FormGroup {
        return this.fb.group({
            employee: [this.data.employee, Validators.required],
            start_date: [this.data.start_date, Validators.required],
            end_date: [this.data.end_date, [Validators.required]],
            status: [this.data.status, Validators.required],
            leave_type: [this.data.leave_type, Validators.required],
        });
    }
}
