import { MessageService } from 'primeng/api';
import { NotificationService } from 'src/app/interfaces/notification-service';

export abstract class BaseNotificationService implements NotificationService {
    constructor(
        protected messageService: MessageService,
        private entity: string
    ) {}
    showSuccess(message: string): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
        });
    }
    showCreateSuccess(): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.entity} created`,
        });
    }

    public showDeleteSuccess(): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${this.entity} deleted`,
        });
    }
    public showError(message: string): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
        });
    }

    public showWarning(message: string): void {
        this.messageService.add({
            severity: 'warn',
            summary: 'warn',
            detail: message,
        });
    }
}
