import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { BaseTimeSheetDialogComponent } from '../../base-components/base-timesheet-dialog.component';
import { UnavailableDatesApiService } from '../../../../shared/unavailable-dates/unavailable-dates-api-service';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { NgIf } from '@angular/common';
import { EmployeeSelectComponent } from '../../../../shared/employee-select/employee-select/employee-select.component';

@Component({
    selector: 'app-create-timesheet-dialog',
    templateUrl: './create-timesheet-dialog.component.html',
    styleUrl: './create-timesheet-dialog.component.scss',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        EmployeeSelectComponent,
        NgIf,
        CalendarModule,
        InputTextModule,
        DropdownModule,
        CheckboxModule,
        SharedModule,
        ButtonModule,
    ],
})
export class CreateTimeSheetDialogComponent extends BaseTimeSheetDialogComponent {
    constructor(
        unavailableDatesApiService: UnavailableDatesApiService,
        public ref: DynamicDialogRef,
        fb: FormBuilder
    ) {
        super(fb, unavailableDatesApiService);
    }

    protected initializeData(): void {
        this.data = {
            employee: '',
            date: null,
            start_time: null,
            end_time: null,
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
