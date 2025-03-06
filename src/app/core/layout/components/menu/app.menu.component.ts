import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'HOME',
                items: [
                    {
                        label: 'DASHBOARD',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'FEATURES',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'EMPLOYEES',
                        icon: 'pi pi-users',
                        routerLink: ['/features/employees'],
                    },
                    {
                        label: 'TIME_SHEETS',
                        icon: 'pi pi-fw pi-clock',
                        routerLink: ['/features/timesheets'],
                    },
                    {
                        label: 'LEAVES',
                        icon: 'pi pi-fw pi-heart',
                        routerLink: ['/features/leaves'],
                    },
                    // {
                    //     label: 'Auth',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: [
                    //         {
                    //             label: 'Login',
                    //             icon: 'pi pi-fw pi-sign-in',
                    //             routerLink: ['/auth/login'],
                    //         },
                    //         {
                    //             label: 'Error',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/auth/error'],
                    //         },
                    //         {
                    //             label: 'Access Denied',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/auth/access'],
                    //         },
                    //     ],
                    // },
                ],
            },
        ];
    }
}
