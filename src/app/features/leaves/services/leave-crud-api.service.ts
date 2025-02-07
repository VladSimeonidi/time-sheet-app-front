import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Leave } from 'src/app/interfaces/leave';
import { BaseCRUDApiService } from 'src/app/shared/base-table/base-services/base-crud-api.service';

@Injectable()
export class LeaveCRUDApiService extends BaseCRUDApiService<Leave> {
    constructor(protected override http: HttpClient) {
        super(http, 'leaves');
    }
}
