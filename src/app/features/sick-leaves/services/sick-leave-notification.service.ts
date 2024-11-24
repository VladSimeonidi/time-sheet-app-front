import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BaseNotificationService } from 'src/app/shared/base-table/base-services/base-notifiaction.service';

@Injectable()
export class SickLeaveNotificationService extends BaseNotificationService {
    constructor(protected override messageService: MessageService) {
        super(messageService, 'Sick Leave');
    }
}
