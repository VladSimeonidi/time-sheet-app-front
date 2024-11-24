import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SickLeave } from 'src/app/interfaces/sick-leaves';
import { BaseApiService } from 'src/app/shared/base-table/base-services/base-api.service';

@Injectable()
export class SickLeaveApiService extends BaseApiService<SickLeave> {
    constructor(protected override http: HttpClient) {
        super(http, 'sick-leaves');
    }
}
