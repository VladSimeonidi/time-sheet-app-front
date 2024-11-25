import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { BaseEmployeeDialogComponent } from 'src/app/features/empolyees/base-components/base-employee-dialog.component';
import { Employee } from 'src/app/interfaces/employee';

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
    ];

    constructor(public ref: DynamicDialogRef, fb: FormBuilder) {
        super(fb);
    }

    protected initializeData(): void {}

    protected override buildForm(): FormGroup {
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
