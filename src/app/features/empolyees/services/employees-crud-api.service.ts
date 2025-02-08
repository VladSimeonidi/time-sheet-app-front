import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { BaseCRUDApiService } from 'src/app/shared/base-table/base-services/base-crud-api.service';

@Injectable()
export class EmployeesCRUDApiService extends BaseCRUDApiService<Employee> {
    constructor(http: HttpClient) {
        super(http, 'employees');
    }
}
