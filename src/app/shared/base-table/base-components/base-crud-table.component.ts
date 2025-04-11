import { Directive, OnDestroy } from '@angular/core';
import { BaseTableComponent } from './base-table.component';
import { BaseCRUDApiService } from '../base-services/base-crud-api.service';
import { BaseConfirmationService } from '../base-services/base-confirmation.service';
import { BaseDialogService } from '../base-services/base-dialog.service';
import { BaseNotificationService } from '../base-services/base-notifiaction.service';
import { BasePaginationService } from '../base-services/base-pagination.service';
import {
    Subject,
    takeUntil,
    filter,
    switchMap,
    tap,
    catchError,
    EMPTY,
    firstValueFrom,
} from 'rxjs';
import { DialogAction } from 'src/app/enums/dialog-action.enum';

@Directive()
export abstract class BaseCrudTableComponent<T>
    extends BaseTableComponent<T>
    implements OnDestroy
{
    private destroy$ = new Subject<void>();
    constructor(
        protected dialogService: BaseDialogService<T>,
        crudService: BaseCRUDApiService<T>,
        paginationService: BasePaginationService,
        notificationService: BaseNotificationService,
        protected confirmationService: BaseConfirmationService
    ) {
        super(crudService, paginationService, notificationService);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
            this.handleDeleteItem(data._id);
        }
    }

    public openDialog(action: DialogAction, item?: any): void {
        const dialogRef = this.dialogService.getDialogRef(action, item);

        dialogRef.onClose
            .pipe(
                takeUntil(this.destroy$),
                filter(this.isDialogDataValid),
                switchMap((data) => this.handleDialogClose(data, item?._id))
            )
            .subscribe({
                error: (err) =>
                    console.error('Error handling dialog close:', err),
            });
    }

    private async handleDeleteItem(id: string): Promise<void> {
        if (!id) return this.handleError('Something went wrong', null);

        const response: boolean = await this.getDeleteConfirmation();

        if (response) this.deleteItem(id);
    }

    private getDeleteConfirmation(): Promise<boolean> {
        return firstValueFrom(this.confirmationService.confirmAction());
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
}
