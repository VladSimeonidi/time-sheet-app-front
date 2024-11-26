import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'empty',
                loadChildren: () =>
                    import('./empty/emptydemo.module').then(
                        (m) => m.EmptyDemoModule
                    ),
            },
            {
                path: 'employees',
                loadChildren: () =>
                    import('./empolyees/employees.module').then(
                        (m) => m.EmployeesModule
                    ),
            },
            {
                path: 'timesheets',
                loadChildren: () =>
                    import('./timesheets/timesheets.module').then(
                        (m) => m.TimeSheetsModule
                    ),
            },
            {
                path: 'leaves',
                loadChildren: () =>
                    import('./leaves/leaves.module').then(
                        (m) => m.LeavesModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
