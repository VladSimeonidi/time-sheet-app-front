import { OnDestroy, Directive } from '@angular/core';
import {
    catchError,
    EMPTY,
    filter,
    Subject,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs';
import { BaseApiService as BaseApiService } from '../base-services/base-api.service';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { BaseDialogService } from '../base-services/base-dialog.service';
import { BasePaginationService } from '../base-services/base-pagination.service';
import { ErrorMessages } from 'src/app/enums/error-messages.enum';
import { BaseConfirmationService } from '../base-services/base-confirmation.service';
import { BaseNotificationService } from '../base-services/base-notifiaction.service';

@Directive()
export abstract class BaseTableComponent<T> {
    public items: T[];
    public totalRecords = 0;
    public rowsPerPage = 5;
    public loading = true;

    constructor(
        protected dialogService: BaseDialogService<T>,
        protected crudService: BaseApiService<T>,
        protected paginationService: BasePaginationService,
        protected notificationService: BaseNotificationService,
        protected confirmationService: BaseConfirmationService
    ) {}

    public loadItems(event: any): void {
        const { pageNumber, pageSize } =
            this.paginationService.calculatePagination(event);

        this.crudService
            .getPaginated(pageNumber, pageSize)
            .pipe(
                tap((data) => this.setItems(data)),
                catchError((error) => {
                    this.handleError(ErrorMessages.LOAD_ITEMS, error);
                    return EMPTY;
                })
            )
            .subscribe();
    }

    private setItems(data: { items: T[]; totalRecords: number }): void {
        this.items = data.items;
        this.totalRecords = data.totalRecords;
        this.loading = false;
    }

    protected handleError(message: string, error: any): void {
        this.notificationService.showError(message);
        this.loading = false;
    }

    protected refreshTable(): void {
        const lastEvent = this.paginationService.getLastPaginationEvent();
        if (lastEvent) {
            this.loadItems(lastEvent);
        }
    }
}
