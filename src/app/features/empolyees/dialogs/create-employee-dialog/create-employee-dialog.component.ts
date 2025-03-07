import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { Employee } from 'src/app/interfaces/employee';
import { BaseEmployeeDialogComponent } from '../base-components/base-employee-dialog.component';

@Component({
    selector: 'app-create-employee-dialog',
    templateUrl: './create-employee-dialog.component.html',
    styleUrl: './create-employee-dialog.component.scss',
})
export class CreateEmployeeDialogComponent extends BaseEmployeeDialogComponent {
    public fields = [
        {
            name: 'firstname',
            label: 'First Name',
            type: 'text',
            validators: [Validators.required],
            format: 'input',
        },
        {
            name: 'surname',
            label: 'Surname',
            type: 'text',
            validators: [Validators.required],
            format: 'input',
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            validators: [Validators.required, Validators.email],
            format: 'email',
        },
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            validators: [Validators.required],
            format: 'input',
        },
        {
            name: 'role',
            label: 'Role',
            type: 'text',
            validators: [Validators.required],
            format: 'dropdown',
            options: this.roles,
        },
        {
            name: 'employment_status',
            label: 'Employment Status',
            type: 'text',
            validators: [Validators.required],
            format: 'dropdown',
            options: this.employment_status,
        },
        {
            name: 'weekly_hours',
            label: 'Weekly hours',
            type: 'number',
            validators: [Validators.required],
            format: 'input',
        },
    ];

    constructor(public ref: DynamicDialogRef, fb: FormBuilder) {
        super(fb);
    }

    protected initializeData(): void {}

    protected buildForm(): FormGroup {
        return (this.form = this.fb.group(
            this.fields.reduce((controls, field) => {
                controls[field.name] = ['', field.validators];
                return controls;
            }, {})
        ));
    }

    protected saveData(employeeData: Partial<Employee>): void {
        this.ref.close({ data: employeeData, action: DialogAction.CREATE });
    }

    protected cancelData(): void {
        this.ref.close({ action: DialogAction.CANCEL });
    }
}
