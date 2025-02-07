import { Directive, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Status } from 'src/app/enums/timesheet-status.enum';
import { Employee } from 'src/app/interfaces/employee';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { BaseDialogComponent } from 'src/app/shared/base-table/base-components/base-dialog.component';
import { UnavailableDatesApiService } from '../../../shared/unavailable-dates/unavailable-dates-api-service';

@Directive()
export abstract class BaseTimeSheetDialogComponent
    extends BaseDialogComponent<TimeSheet>
    implements OnDestroy
{
    private readonly START_HOUR_OFFSET = 9;
    private readonly WORK_HOURS = 8;

    public timeSheetStatuses = [
        { field: Status.APPROVED, header: 'Approved' },
        { field: Status.DENIED, header: 'Denied' },
    ];

    public disabledDates: Date[] = [];

    private destroy$ = new Subject<void>();

    constructor(
        fb: FormBuilder,
        protected unavailableDatesApiService: UnavailableDatesApiService
    ) {
        super(fb);
    }

    protected initializeComponent() {
        this.initializeForm();
        this.setupFormListeners();
        this.updateTotalHoursWorked();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onEmployeeSelected(employee: Employee): void {
        const employeeControl = this.form.get('employee');
        if (employeeControl) {
            employeeControl.setValue(employee._id);
        }
        this.unavailableDatesApiService
            .getAllUnavailableDates(employee._id)
            .subscribe({
                next: (response) => {
                    this.disabledDates = response.map(
                        (dateStr) => new Date(dateStr)
                    );
                },

                error: (err) =>
                    console.error('Error fetching disabled dates:', err),
            });
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
            startTime.setHours(startTime.getHours() + this.START_HOUR_OFFSET);
            this.form
                .get('start_time')
                .setValue(startTime, { emitEvent: true });
        }
    }

    private updateEndTime(startTime: Date) {
        if (startTime) {
            const initialTime: Date = new Date(startTime);

            initialTime.setHours(initialTime.getHours() + this.WORK_HOURS);

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
