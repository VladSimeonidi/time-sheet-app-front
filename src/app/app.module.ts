import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './core/layout/app.layout.module';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, HttpClientModule, ToastModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService,
    ],
    bootstrap: [AppComponent],
    exports: [ToastModule],
})
export class AppModule {}
