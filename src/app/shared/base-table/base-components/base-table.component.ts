import { Directive } from '@angular/core';
import { catchError, EMPTY, tap } from 'rxjs';
import { BaseCRUDApiService as BaseCRUDApiService } from '../base-services/base-crud-api.service';
import { BasePaginationService } from '../base-services/base-pagination.service';
import { ErrorMessages } from 'src/app/enums/error-messages.enum';
import { BaseNotificationService } from '../base-services/base-notifiaction.service';

@Directive()
export abstract class BaseTableComponent<T> {
    public items: T[];
    public totalRecords = 0;
    public rowsPerPage = 5;
    public loading = true;

    protected queryParams: {
        [key: string]: string | number | boolean;
    };

    constructor(
        protected crudService: BaseCRUDApiService<T>,
        protected paginationService: BasePaginationService,
        protected notificationService: BaseNotificationService
    ) {}

    public loadItems(event: any): void {
        const { pageNumber, pageSize } =
            this.paginationService.calculatePagination(event);

        this.crudService
            .getPaginated(pageNumber, pageSize, this.queryParams)
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
