import {
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { BaseCRUDApiService } from './base-crud-api.service';
import { BaseNotificationService } from './base-notifiaction.service';

export abstract class BaseDialogService<T> {
    constructor(
        protected dialogService: DialogService,
        protected crudService: BaseCRUDApiService<T>,
        protected notificationService: BaseNotificationService,
        private entity: string
    ) {}

    public getDialogRef(action: DialogAction, item?: T): DynamicDialogRef {
        let dialogConfig = this.getDialogConfig(action, item);
        let dialogComponent = this.getDialogComponent(action, item);

        return this.dialogService.open(dialogComponent, dialogConfig);
    }

    public onDialogClose(
        data: { data: Partial<T>; action: DialogAction },
        id?: string
    ): Observable<T> {
        const actionsMap: {
            [key in DialogAction]?: (
                item: Partial<T>,
                id?: string
            ) => Observable<T>;
        } = {
            [DialogAction.CREATE]: (item) => this.crudService.create(item),
            [DialogAction.EDIT]: (item, id) =>
                this.crudService.update(id, item),
        };

        const { action, data: itemData } = data;

        const actionMethod = actionsMap[action];
        if (actionMethod) {
            return actionMethod(itemData, id).pipe(
                tap(() =>
                    this.notificationService.showSuccess(
                        `Succeeded to ${action} ${this.entity}`
                    )
                ),
                catchError((res) => {
                    this.notificationService.showError(
                        `Failed to ${action} ${this.entity} (${res.error})`
                    );
                    return EMPTY;
                })
            );
        } else {
            console.warn('Unhandled dialog action:', action);
            return EMPTY;
        }
    }

    private getDialogConfig(action: DialogAction, item?: T) {
        let dialogConfig: DynamicDialogConfig;
        switch (action) {
            case DialogAction.CREATE:
                dialogConfig = this.getCreateDialogConfig();
                break;
            case DialogAction.EDIT:
                dialogConfig = this.getEditDialogConfig(item);
                break;
            default:
                throw new Error('Invalid dialog action');
        }

        return dialogConfig;
    }

    private getDialogComponent(action: DialogAction, item?: T) {
        let dialogComponent;

        switch (action) {
            case DialogAction.CREATE:
                dialogComponent = this.getCreateDialogComponent();
                break;
            case DialogAction.EDIT:
                dialogComponent = this.getEditDialogComponent();
                break;
            default:
                throw new Error('Invalid dialog action');
        }

        return dialogComponent;
    }

    protected abstract getCreateDialogComponent(): any;
    protected abstract getCreateDialogConfig(): any;
    protected abstract getEditDialogComponent(): any;
    protected abstract getEditDialogConfig(item: T): any;
}
