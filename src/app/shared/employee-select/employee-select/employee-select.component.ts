import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeSelectApiService } from '../employee-select-api.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SharedModule } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-employee-select',
    templateUrl: './employee-select.component.html',
    styleUrl: './employee-select.component.scss',
    standalone: true,
    imports: [
        NgIf,
        DropdownModule,
        FormsModule,
        SharedModule,
        ProgressSpinnerModule,
    ],
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
