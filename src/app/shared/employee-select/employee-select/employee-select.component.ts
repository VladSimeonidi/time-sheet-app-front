import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeSelectApiService } from '../employee-select-api.service';

@Component({
    selector: 'app-employee-select',
    templateUrl: './employee-select.component.html',
    styleUrl: './employee-select.component.scss',
})
export class EmployeeSelectComponent implements OnInit {
    @Input() selectedEmployee: Employee | null = null;
    employees: Employee[] = [];

    @Output() employeeSelected = new EventEmitter<Employee>();

    constructor(private employeeSelectApiService: EmployeeSelectApiService) {}

    ngOnInit(): void {
        this.employeeSelectApiService.getEmployees().subscribe((employees) => {
            this.employees = employees;
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
