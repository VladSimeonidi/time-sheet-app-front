import { Directive } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { BaseDialogComponent } from '../../../shared/base-table/base-components/base-dialog.component';

@Directive()
export abstract class BaseEmployeeDialogComponent extends BaseDialogComponent<Employee> {
    public roles = [
        { label: 'Manager', value: 'manager' },
        { label: 'Admin', value: 'admin' },
        { label: 'Developer', value: 'developer' },
        { label: 'Tester', value: 'tester' },
    ];

    public employment_status = [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
    ];

    constructor(protected override fb: FormBuilder) {
        super(fb);
    }
}
