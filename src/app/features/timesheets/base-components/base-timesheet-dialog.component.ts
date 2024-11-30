import { Directive, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Status } from 'src/app/enums/timesheet-status.enum';
import { Employee } from 'src/app/interfaces/employee';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { BaseDialogComponent } from 'src/app/shared/base-table/base-components/base-dialog.component';

@Directive()
export abstract class BaseTimeSheetDialogComponent
    extends BaseDialogComponent<TimeSheet>
    implements OnDestroy
{
    public timeSheetStatuses = [
        { field: Status.APPROVED, header: 'Approved' },
        { field: Status.DENIED, header: 'Denied' },
    ];

    private destroy$ = new Subject<void>();

    constructor(fb: FormBuilder) {
        super(fb);
    }

    protected initializeComponent() {
        this.initializeForm();
        this.setupFormListeners();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onEmployeeSelected(employee: Employee): void {
        this.form.get('employee')?.setValue(employee._id);
    }

    private setupFormListener(
        controlName: string,
        callback: (value: any) => void
    ) {
        this.form
            .get(controlName)
            .valueChanges.pipe(takeUntil(this.destroy$))
            .subscribe(callback);
    }

    private setupFormListeners() {
        this.setupFormListener('date', (date) => this.updateStartTime(date));
        this.setupFormListener('start_time', (startTime) => {
            this.updateEndTime(startTime);
            this.updateTotalHoursWorked();
        });
        this.setupFormListener('end_time', () => this.updateTotalHoursWorked());
    }

    private updateStartTime(date: Date) {
        if (date) {
            const startTime: Date = new Date(date);
            startTime.setHours(startTime.getHours() + 9);
            this.form
                .get('start_time')
                .setValue(startTime, { emitEvent: true });
        }
    }

    private updateEndTime(startTime: Date) {
        if (startTime) {
            const initialTime: Date = new Date(startTime);
            const statusInHours: number = 8;

            initialTime.setHours(initialTime.getHours() + statusInHours);

            this.form
                .get('end_time')
                .setValue(initialTime, { emitEvent: true });
        }
    }

    private updateTotalHoursWorked() {
        const startTime: Date = this.form.get('start_time').value;
        const endTime: Date = this.form.get('end_time').value;

        if (startTime && endTime) {
            const start: Date = new Date(startTime);
            const end: Date = new Date(endTime);
            const diffInMs: number = end.getTime() - start.getTime();
            const totalHours: number = diffInMs / (1000 * 60 * 60);
            this.form.get('total_hours_worked').setValue(totalHours.toFixed(2));
        }
    }
}
