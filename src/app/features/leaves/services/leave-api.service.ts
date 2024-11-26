import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leave } from 'src/app/interfaces/leave';
import { BaseApiService } from 'src/app/shared/base-table/base-services/base-api.service';

@Injectable()
export class LeaveApiService extends BaseApiService<Leave> {
    constructor(protected override http: HttpClient) {
        super(http, 'leaves');
    }
}
