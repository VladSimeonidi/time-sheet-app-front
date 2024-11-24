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
                path: 'sick-leaves',
                loadChildren: () =>
                    import('./sick-leaves/sick-leaves.module').then(
                        (m) => m.SickLeavesModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class FeaturesRoutingModule {}
