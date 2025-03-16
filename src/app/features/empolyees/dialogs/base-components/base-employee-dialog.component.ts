import { Directive } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { BaseDialogComponent } from 'src/app/shared/base-table/base-components/base-dialog.component';

@Directive()
export abstract class BaseEmployeeDialogComponent extends BaseDialogComponent<Employee> {
    readonly WEEKLY_HOURS = 40;

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

    public fields = [
        {
            name: 'firstname',
            label: 'First Name',
            type: 'text',
            validators: [Validators.required],
            format: 'input',
            prepopulate: '',
        },
        {
            name: 'surname',
            label: 'Surname',
            type: 'text',
            validators: [Validators.required],
            format: 'input',
            prepopulate: '',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            validators: [Validators.required, Validators.email],
            format: 'email',
            prepopulate: '',
        },
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            validators: [Validators.required],
            format: 'input',
            prepopulate: '',
        },
        {
            name: 'role',
            label: 'Role',
            type: 'text',
            validators: [Validators.required],
            format: 'dropdown',
            options: this.roles,
            prepopulate: this.roles[0].value,
        },
        {
            name: 'employment_status',
            label: 'Employment Status',
            type: 'text',
            validators: [Validators.required],
            format: 'dropdown',
            options: this.employment_status,
            prepopulate: this.employment_status[0].value,
        },
        {
            name: 'weekly_hours',
            label: 'Weekly hours',
            type: 'number',
            validators: [Validators.required],
            format: 'input',
            prepopulate: this.WEEKLY_HOURS,
        },
    ];

    constructor(fb: FormBuilder) {
        super(fb);
    }

    protected initializeComponent() {
        this.initializeForm();
    }
}
