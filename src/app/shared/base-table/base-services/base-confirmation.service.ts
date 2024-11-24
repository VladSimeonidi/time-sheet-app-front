import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ConfirmationServiceModel } from 'src/app/interfaces/confirmation-service';

export abstract class BaseConfirmationService
    implements ConfirmationServiceModel
{
    constructor(protected confirmationService: ConfirmationService) {}

    public confirmAction(): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.confirmationService.confirm({
                header: 'Confirmation',
                message: 'Are you sure you want to proceed?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    observer.next(true);
                    observer.complete();
                },
                reject: () => {
                    observer.next(false);
                    observer.complete();
                },
            });
        });
    }
}
