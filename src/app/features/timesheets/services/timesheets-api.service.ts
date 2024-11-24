import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeSheet } from 'src/app/interfaces/timesheet';
import { BaseApiService } from 'src/app/shared/base-table/base-services/base-api.service';

@Injectable()
export class TimeSheetsApiService extends BaseApiService<TimeSheet> {
    constructor(protected override http: HttpClient) {
        super(http, 'timesheets');
    }
}
