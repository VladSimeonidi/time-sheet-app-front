import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BaseConfirmationService } from 'src/app/shared/base-table/base-services/base-confirmation.service';

@Injectable()
export class EmployeeConfirmationService extends BaseConfirmationService {
    constructor(confirmationService: ConfirmationService) {
        super(confirmationService);
    }
}
