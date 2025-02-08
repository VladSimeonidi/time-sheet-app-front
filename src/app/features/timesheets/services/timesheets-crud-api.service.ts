import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { BaseCRUDApiService } from 'src/app/shared/base-table/base-services/base-crud-api.service';

@Injectable()
export class TimeSheetsCRUDApiService extends BaseCRUDApiService<TimeSheet> {
    constructor(http: HttpClient) {
        super(http, 'timesheets');
    }
}
