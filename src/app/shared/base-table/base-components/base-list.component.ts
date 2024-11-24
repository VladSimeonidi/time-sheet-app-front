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
export abstract class BaseListComponent<T> implements OnDestroy {
    public items: T[];
    public totalRecords = 0;
    public rowsPerPage = 5;
    public loading = true;
    private destroy$ = new Subject<void>();

    constructor(
        protected dialogService: BaseDialogService<T>,
        protected crudService: BaseApiService<T>,
        protected paginationService: BasePaginationService,
        protected notificationService: BaseNotificationService,
        protected confirmationService: BaseConfirmationService
    ) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

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

    public onAction(args: {
        action: string;
        data: Partial<T> & { _id: string };
    }) {
        const { action, data } = args;

        if (action === DialogAction.EDIT) {
            this.openDialog(DialogAction.EDIT, data);
        }

        if (action === DialogAction.DELETE) {
            if (data._id) {
                this.promptDeleteItem(data._id);
            } else {
                console.error('Missing _id in data for delete action.');
            }
        }
    }

    public promptDeleteItem(id: string): void {
        this.confirmationService
            .confirmAction()
            .pipe(takeUntil(this.destroy$))
            .subscribe((result) => {
                if (result) {
                    this.deleteItem(id);
                } else {
                    this.notificationService.showWarning('You have rejected');
                }
            });
    }

    public openDialog(action: DialogAction, item?: any): void {
        const dialogRef = this.dialogService.getDialogRef(action, item);

        dialogRef.onClose
            .pipe(
                takeUntil(this.destroy$),
                filter(this.isDialogDataValid),
                switchMap((data) => this.handleDialogClose(data, item?._id))
            )
            .subscribe({});
    }

    private isDialogDataValid(data: any): boolean {
        return !!data;
    }

    private handleDialogClose(data: any, itemId?: string) {
        return this.dialogService.onDialogClose(data, itemId).pipe(
            tap(() => this.refreshTable()),
            catchError((error) => {
                this.handleError('Something went wrong', error);
                return EMPTY;
            })
        );
    }

    private deleteItem(id: string): void {
        this.crudService.delete(id).subscribe({
            next: () => {
                this.refreshTable();
                this.notificationService.showDeleteSuccess();
            },
            error: (error) => this.handleError('Failed to delete item', error),
        });
    }

    private setItems(data: { items: T[]; totalRecords: number }): void {
        this.items = data.items;
        this.totalRecords = data.totalRecords;
        this.loading = false;
    }

    private handleError(message: string, error: any): void {
        this.notificationService.showError(message);
        this.loading = false;
    }

    refreshTable(): void {
        const lastEvent = this.paginationService.getLastPaginationEvent();
        if (lastEvent) {
            this.loadItems(lastEvent);
        }
    }
}
