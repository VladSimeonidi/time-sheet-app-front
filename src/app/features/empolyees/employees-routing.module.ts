import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { EmployeeSummaryComponent } from './employee-summary/employee-summary.component';

const routes: Routes = [
    { path: '', component: EmployeesComponent },
    { path: 'employee-summary/:id', component: EmployeeSummaryComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeesRoutingModule {}
