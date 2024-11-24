import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { BaseApiService } from 'src/app/shared/base-table/base-services/base-api.service';

@Injectable()
export class EmployeesApiService extends BaseApiService<Employee> {
    constructor(protected override http: HttpClient) {
        super(http, 'employees');
    }
}
