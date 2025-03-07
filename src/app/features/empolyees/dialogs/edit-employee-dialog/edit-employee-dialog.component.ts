import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { BaseEmployeeDialogComponent } from '../base-components/base-employee-dialog.component';

@Component({
    selector: 'app-edit-employee-dialog',
    templateUrl: './edit-employee-dialog.component.html',
    styleUrl: './edit-employee-dialog.component.scss',
})
export class EditEmployeeDialogComponent extends BaseEmployeeDialogComponent {
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        fb: FormBuilder
    ) {
        super(fb);
    }

    protected initializeData(): void {
        this.data = { ...this.config.data.employee };
    }

    protected buildForm(): FormGroup {
        return (this.form = this.fb.group(
            this.fields.reduce((controls, field) => {
                controls[field.name] = [
                    this.data[field.name],
                    field.validators,
                ];
                return controls;
            }, {})
        ));
    }

    protected saveData(employeeData: Partial<Employee>): void {
        this.ref.close({ data: employeeData, action: DialogAction.EDIT });
    }

    protected cancelData(): void {
        this.ref.close({ action: DialogAction.CANCEL });
    }
}
