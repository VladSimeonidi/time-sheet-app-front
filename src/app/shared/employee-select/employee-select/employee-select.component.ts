import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { Observable, take } from 'rxjs';
import { EmployeeState } from 'src/app/store/employee.reducers';
import { Store } from '@ngrx/store';
import { selectEmployees } from 'src/app/store/employee.selectors';
import { loadEmployees } from 'src/app/store/employee.actions';

@Component({
    selector: 'app-employee-select',
    templateUrl: './employee-select.component.html',
    styleUrl: './employee-select.component.scss',
})
export class EmployeeSelectComponent implements OnInit {
    @Input() selectedEmployee: Employee | null = null;
    employees$: Observable<Employee[]>;

    @Output() employeeSelected = new EventEmitter<Employee>();

    constructor(private store: Store<{ employees: EmployeeState }>) {
        this.employees$ = this.store.select(selectEmployees);
    }

    ngOnInit(): void {
        this.store
            .select(selectEmployees)
            .pipe(take(1))
            .subscribe((employees) => {
                if (!employees || employees.length === 0) {
                    this.store.dispatch(loadEmployees());
                }
            });

        if (this.selectedEmployee) {
            this.employeeSelected.emit(this.selectedEmployee);
        }
    }

    onEmployeeSelect(): void {
        if (this.selectedEmployee) {
            this.employeeSelected.emit(this.selectedEmployee);
        }
    }
}
