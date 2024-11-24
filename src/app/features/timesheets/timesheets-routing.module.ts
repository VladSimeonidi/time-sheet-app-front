import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeSheetsComponent } from './timesheets.component';

const routes: Routes = [{ path: '', component: TimeSheetsComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TimeSheetRoutingModule {}
