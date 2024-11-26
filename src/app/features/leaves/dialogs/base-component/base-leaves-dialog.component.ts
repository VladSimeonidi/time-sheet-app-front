import { Directive, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { LeaveTypes } from 'src/app/enums/leave-types.enum';
import { Status } from 'src/app/enums/timesheet-status.enum';
import { Employee } from 'src/app/interfaces/employee';
import { Leave } from 'src/app/interfaces/leave';
import { BaseDialogComponent } from 'src/app/shared/base-table/base-components/base-dialog.component';

@Directive()
export abstract class BaseLeavesDialogComponent
    extends BaseDialogComponent<Leave>
    implements OnDestroy
{
    public LeaveTypes = [
        { field: LeaveTypes.SICK, header: 'Sick Leave' },
        { field: LeaveTypes.ANNUAL, header: 'Annual Leave' },
        { field: LeaveTypes.COMPENSATORY, header: 'Compensatory Leave' },
        { field: LeaveTypes.MATERNITY, header: 'Maternity Leave' },
        { field: LeaveTypes.PARENTAL, header: 'Parental Leave' },
        { field: LeaveTypes.UNPAID, header: 'Unpaid Leave' },
        { field: LeaveTypes.PATERNITY, header: 'Paternity Leave' },
        { field: LeaveTypes.PERSONAL, header: ' Leave' },
    ];
    public LeaveStatuses = [
        { field: Status.APPROVED, header: 'Approved' },
        { field: Status.DENIED, header: 'Denied' },
    ];

    private destroy$ = new Subject<void>();

    constructor(fb: FormBuilder) {
        super(fb);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public onEmployeeSelected(employee: Employee): void {
        this.form.get('employee')?.setValue(employee._id);
    }

    protected initializeComponent(): void {
        this.initializeForm();
    }
}
