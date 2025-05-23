import { style } from '@angular/animations';
import { Component, ElementRef, ViewChild, Host } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from '../view/components/auth/services/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: `
        :host ::ng-deep {
            .layout-menu-button {
                margin-left: 0;
                margin-right: 2rem;
            }

            .layout-topbar-logo {
                width: auto;
            }
    }
    `,
})
export class AppTopBarComponent {
    theme: boolean = true;

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authService: AuthService
    ) {}

    logout() {
        this.router.navigate(['login']);
        this.authService.logout();
    }
}
