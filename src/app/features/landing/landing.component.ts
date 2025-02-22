import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/core/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    standalone: true,
})
export class LandingComponent {
    constructor(public layoutService: LayoutService, public router: Router) {}
}
