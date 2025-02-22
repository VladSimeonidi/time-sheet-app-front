import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';

@Component({
    templateUrl: './dashboard.component.html',
    standalone: true,
})
export class DashboardComponent {
    items!: MenuItem[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor() {}
}
