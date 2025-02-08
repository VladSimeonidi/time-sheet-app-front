import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BaseNotificationService } from 'src/app/shared/base-table/base-services/base-notifiaction.service';

@Injectable()
export class EmployeeNotificationService extends BaseNotificationService {
    constructor(messageService: MessageService) {
        super(messageService, 'Employee');
    }
}
