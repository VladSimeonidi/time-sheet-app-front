import { Observable } from 'rxjs';

export interface ConfirmationServiceModel {
    confirmAction(event: Event): Observable<boolean>;
}
