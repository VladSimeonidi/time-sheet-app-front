import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { ToastModule } from 'primeng/toast';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { MessageService } from 'primeng/api';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, ToastModule),
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService,
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch(err => console.error(err));
