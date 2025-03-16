import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { Employee } from 'src/app/interfaces/employee';
import { BaseEmployeeDialogComponent } from '../base-components/base-employee-dialog.component';

@Component({
    selector: 'app-create-employee-dialog',
    templateUrl: '../shared/shared-employee-dialog.component.html',
    styleUrl: './create-employee-dialog.component.scss',
})
export class CreateEmployeeDialogComponent extends BaseEmployeeDialogComponent {
    constructor(public ref: DynamicDialogRef, fb: FormBuilder) {
        super(fb);
    }

    protected initializeData(): void {}

    protected buildForm(): FormGroup {
        return (this.form = this.fb.group(
            this.fields.reduce((controls, field) => {
                controls[field.name] = [field.prepopulate, field.validators];
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
