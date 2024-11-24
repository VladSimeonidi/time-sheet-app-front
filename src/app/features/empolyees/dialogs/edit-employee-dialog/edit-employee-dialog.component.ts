import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEmployeeDialogComponent } from 'src/app/features/empolyees/base-components/base-employee-dialog.component';
import { Employee } from 'src/app/interfaces/employee';
import { DialogAction } from 'src/app/enums/dialog-action.enum';

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
        return this.fb.group({
            firstname: [this.data.firstname, Validators.required],
            surname: [this.data.surname, Validators.required],
            email: [this.data.email, [Validators.required, Validators.email]],
            username: [this.data.username, Validators.required],
            role: [this.data.role, Validators.required],
            employment_status: [
                this.data.employment_status,
                Validators.required,
            ],
        });
    }

    protected saveData(employeeData: Partial<Employee>): void {
        this.ref.close({ data: employeeData, action: DialogAction.EDIT });
    }

    protected cancelData(): void {
        this.ref.close({ action: DialogAction.CANCEL });
    }
}
