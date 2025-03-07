import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './core/layout/app.layout.module';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/employee.effects';
import { employeeReducer } from './store/employee.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        ToastModule,
        StoreModule.forRoot({}, {}),
        StoreModule.forFeature('employees', employeeReducer),
        EffectsModule.forFeature([EmployeeEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: false,
        }),
        EffectsModule.forRoot([EmployeeEffects]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        EffectsModule.forRoot([]),
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService,
    ],
    bootstrap: [AppComponent],
    exports: [ToastModule],
})
export class AppModule {}
