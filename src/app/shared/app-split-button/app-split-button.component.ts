import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Employee } from 'src/app/interfaces/employee';

@Component({
    selector: 'app-split-button',
    templateUrl: './app-split-button.component.html',
    styleUrl: './app-split-button.component.scss',
})
export class AppSplitButtonComponent {
    @Input() rowData: Partial<Employee>;
    @Output() actionSelected = new EventEmitter<{
        action: string;
        data: Partial<Employee>;
    }>();

    items: MenuItem[] = [
        {
            label: 'Edit',
            command: () => {
                this.emitAction('edit');
            },
        },
        {
            label: 'Delete',
            command: () => {
                this.emitAction('delete');
            },
        },
    ];

    constructor() {}

    public emitClickedAction() {
        this.emitAction('splitButtonAction');
    }

    public emitAction(action: string) {
        this.actionSelected.emit({
            action,
            data: this.rowData,
        });
    }
}
