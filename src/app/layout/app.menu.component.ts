import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from '../view/components/auth/services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styles: [
        `
            :host ::ng-deep .layout-menu {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        `,
    ],
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    bottomModel: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                    },
                    {
                        label: 'Minha avaliação',
                        icon: 'pi pi-plus',
                        routerLink: ['dashboard/avaliacao'],
                    },
                ],
            },
        ];

        this.bottomModel = [
            {
                items: [
                    {
                        label: 'Deletar conta',
                        icon: 'pi pi-user-minus',
                        command: () => {
                            //this.confirmarDelecaoConta();
                        },
                    },
                    {
                        label: 'Sair',
                        icon: 'pi pi-sign-out',
                        routerLink: ['auth/login'],
                        command: () => {
                            this.logout();
                        },
                    },
                ],
            },
        ];
    }

    logout() {
        this.router.navigate(['login']);
        this.authService.logout();
    }
}
