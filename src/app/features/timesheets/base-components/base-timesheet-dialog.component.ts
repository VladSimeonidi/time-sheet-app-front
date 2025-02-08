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
    public timeSheetStatuses = [
        { field: Status.APPROVED, header: 'Approved' },
        { field: Status.DENIED, header: 'Denied' },
    ];

    public disabledDates: Date[] = [];

    private readonly START_HOUR_OFFSET = 9;

    private destroy$ = new Subject<void>();
    private breaks: boolean = false;

    constructor(
        fb: FormBuilder,
        protected unavailableDatesApiService: UnavailableDatesApiService
    ) {
        super(fb);
    }

    protected initializeComponent() {
        this.initializeForm();
        this.setupFormListeners();
        this.subscribeToBreaks();
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
            this.form
                .get('end_time')
                .setValue(initialTime, { emitEvent: true });
        }
    }

    private isBreaksIncluded(): boolean {
        return !!this.breaks;
    }

    private updateTotalHoursWorked() {
        const startTimeControl = this.form.get('start_time');
        const endTimeControl = this.form.get('end_time');
        const totalHoursControl = this.form.get('total_hours_worked');

        if (!startTimeControl || !endTimeControl || !totalHoursControl) {
            console.error('Form controls are missing');
            return;
        }

        const startTime: Date = startTimeControl.value;
        const endTime: Date = endTimeControl.value;

        if (startTime && endTime) {
            const start = new Date(startTime);
            const end = new Date(endTime);
            const diffInMs = end.getTime() - start.getTime();
            let totalHours = diffInMs / (1000 * 60 * 60);

            if (this.isBreaksIncluded()) {
                totalHours -= 1;
            }

            totalHoursControl.setValue(totalHours.toFixed(2));
        }
    }

    private subscribeToBreaks() {
        const breaksControl = this.form.get('breaks');

        if (breaksControl) {
            this.breaks = breaksControl.value;

            breaksControl.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (value) => {
                        this.breaks = value;
                        this.updateTotalHoursWorked();
                    },
                    error: (err) =>
                        console.error('Error in breaks subscription:', err),
                });
        }
    }
}
