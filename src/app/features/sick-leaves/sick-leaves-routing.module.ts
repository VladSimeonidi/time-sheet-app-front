import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SickLeavesComponent } from './sick-leaves.component';

const routes: Routes = [{ path: '', component: SickLeavesComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SickLeavesRoutingModule {}
