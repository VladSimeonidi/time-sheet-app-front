export interface NotificationService {
    showCreateSuccess(): void;
    showDeleteSuccess(): void;

    showSuccess(message: string): void;

    showError(message: string): void;
}
