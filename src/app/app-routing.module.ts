import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard } from './view/components/auth/guard/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                { path: '', redirectTo: 'login', pathMatch: 'full' },

                {
                    path: 'login',
                    loadChildren: () =>
                        import(
                            './view/components/auth/login/login.module'
                        ).then((m) => m.LoginModule),
                },
                {
                    path: 'signup',
                    loadChildren: () =>
                        import(
                            './view/components/auth/signup/signup.module'
                        ).then((m) => m.SignupModule),
                },

                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        /* { path: 'bmi', loadChildren: () => import('./view/components/bmi/bmi.module').then(m => m.BmiModule) }, */
                        {
                            path: 'dashboard',
                            loadChildren: () =>
                                import(
                                    './view/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                    ],
                    canActivate: [authGuard],
                },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
