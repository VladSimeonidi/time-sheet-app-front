import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { BaseTimeSheetDialogComponent } from '../../base-components/base-timesheet.component';

@Component({
    selector: 'app-create-timesheet-dialog',
    templateUrl: './create-timesheet-dialog.component.html',
    styleUrl: './create-timesheet-dialog.component.scss',
})
export class CreateTimeSheetDialogComponent extends BaseTimeSheetDialogComponent {
    constructor(public ref: DynamicDialogRef, fb: FormBuilder) {
        super(fb);
    }

    protected initializeData(): void {
        this.data = {
            employee: '',
            date: new Date(),
            start_time: new Date(),
            end_time: new Date(),
            breaks: false,
            total_hours_worked: 0,
            timesheet_status: '',
        };
    }
    protected saveData(timesheetData: any): void {
        this.ref.close({ data: timesheetData, action: DialogAction.CREATE });
    }

    protected cancelData(): void {
        this.ref.close({ action: DialogAction.CANCEL });
    }
    protected buildForm(): FormGroup {
        return this.fb.group({
            employee: [this.data.employee, Validators.required],
            date: [this.data.date, Validators.required],
            start_time: [this.data.start_time, [Validators.required]],
            end_time: [this.data.end_time, Validators.required],
            breaks: [this.data.breaks, Validators.required],
            total_hours_worked: [
                this.data.total_hours_worked,
                Validators.required,
            ],
            timesheet_status: [this.data.timesheet_status, Validators.required],
        });
    }
}
