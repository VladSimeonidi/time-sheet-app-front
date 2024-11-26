import { Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseDialogComponent<T> implements OnInit {
    public form: FormGroup;
    public data: Partial<T>;

    constructor(protected fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    public isFieldInvalid(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return field && field.invalid && (field.dirty || field.touched);
    }

    public onSave() {
        if (this.form.valid) this.saveData(this.form.value);
    }

    public onCancel() {
        this.cancelData();
    }

    protected initializeForm() {
        this.initializeData();
        this.form = this.buildForm();
    }

    protected abstract initializeData(): void;

    protected abstract saveData(data: Partial<T>): void;

    protected abstract cancelData(): void;

    protected abstract buildForm(): FormGroup;
}
