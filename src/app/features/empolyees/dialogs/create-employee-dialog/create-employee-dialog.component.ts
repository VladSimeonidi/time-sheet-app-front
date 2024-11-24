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
    constructor(public ref: DynamicDialogRef, fb: FormBuilder) {
        super(fb);
    }

    protected initializeData(): void {
        this.data = {
            firstname: '',
            surname: '',
            email: '',
            username: '',
            role: this.roles[0].value,
            employment_status: this.employment_status[0].value,
        };
    }

    protected override buildForm(): FormGroup {
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
        this.ref.close({ data: employeeData, action: DialogAction.CREATE });
    }

    protected cancelData(): void {
        this.ref.close({ action: DialogAction.CANCEL });
    }
}
