import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSelectComponent } from './employee-select/employee-select.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeeSelectApiService } from './employee-select-api.service';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        HttpClientModule,
        FormsModule,
        ProgressSpinnerModule,
        EmployeeSelectComponent,
    ],
    exports: [EmployeeSelectComponent],
    providers: [EmployeeSelectApiService],
})
export class EmployeeSelectModule {}
