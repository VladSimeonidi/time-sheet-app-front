import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../service/app.layout.service';
import { TranslateService } from '@ngx-translate/core';

interface language {
    label: string;
    value: string;
}

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    readonly LanguageKey = 'locale';
    public languages: language[] = [
        { label: 'English', value: 'en' },
        { label: 'Ukrainian', value: 'ua' },
        { label: 'Irish', value: 'ie' },
    ];

    public selectedLanguage = 'en';

    public items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private translate: TranslateService
    ) {}
    ngOnInit(): void {
        const ifLSItemExists: boolean = this.ifLocalStorageItemExists(
            this.LanguageKey
        );

        if (ifLSItemExists) {
            const getLSItem: string = this.getLocalStorageItem(
                this.LanguageKey
            );
            this.translate.use(getLSItem);
            this.selectedLanguage = getLSItem;
        } else {
            this.translate.setDefaultLang(this.selectedLanguage);
        }
    }

    public getLocalStorageItem(key: string): any {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    public setLocalStorageItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public ifLocalStorageItemExists(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    public changeLanguage(lang: string) {
        this.selectedLanguage = lang;
        this.translate.use(lang);
        this.setLocalStorageItem(this.LanguageKey, lang);
    }
}
