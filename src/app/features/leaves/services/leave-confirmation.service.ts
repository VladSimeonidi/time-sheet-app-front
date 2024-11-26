import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BaseConfirmationService } from 'src/app/shared/base-table/base-services/base-confirmation.service';

@Injectable()
export class LeaveConfirmationService extends BaseConfirmationService {
    constructor(protected override confirmationService: ConfirmationService) {
        super(confirmationService);
    }
}
