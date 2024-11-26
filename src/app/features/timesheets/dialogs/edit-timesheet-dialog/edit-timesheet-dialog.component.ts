import { Component } from '@angular/core';
import { BaseTimeSheetDialogComponent } from '../../base-components/base-timesheet-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { DialogAction } from 'src/app/enums/dialog-action.enum';

@Component({
    selector: 'app-edit-timesheet-dialog',
    templateUrl: './edit-timesheet-dialog.component.html',
    styleUrl: './edit-timesheet-dialog.component.scss',
})
export class EditTimeSheetDialogComponent extends BaseTimeSheetDialogComponent {
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        fb: FormBuilder
    ) {
        super(fb);
    }
    protected initializeData(): void {
        this.data = { ...this.config.data.timesheet };
    }
    protected saveData(timesheet: Partial<TimeSheet>): void {
        this.ref.close({ data: timesheet, action: DialogAction.EDIT });
    }
    protected cancelData(): void {
        this.ref.close({ action: DialogAction.CANCEL });
    }
    protected buildForm(): FormGroup {
        return this.fb.group({
            employee: [this.data.employee, Validators.required],
            date: [new Date(this.data.date), Validators.required],
            start_time: [new Date(this.data.start_time), [Validators.required]],
            end_time: [new Date(this.data.end_time), Validators.required],
            breaks: [this.data.breaks, Validators.required],
            total_hours_worked: [
                this.data.total_hours_worked,
                Validators.required,
            ],
            timesheet_status: [this.data.timesheet_status, Validators.required],
        });
    }
}
