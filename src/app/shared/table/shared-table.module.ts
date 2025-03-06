import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AppSplitButtonComponent } from '../app-split-button/app-split-button.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [AppSplitButtonComponent],
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        DynamicDialogModule,
        DropdownModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ToastModule,
        SplitButtonModule,
        TranslateModule.forChild(),
    ],
    exports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        DynamicDialogModule,
        DropdownModule,
        TranslateModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ToastModule,
        AppSplitButtonComponent,
    ],
})
export class SharedTableModule {}
