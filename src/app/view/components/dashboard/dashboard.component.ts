import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { AssessmentService } from './assessment/services/assessment.service';
import { Bmi } from './model/bmi';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CardModule,
        ChartModule,
        MessagesModule,
        PanelModule,
        SkeletonModule,
        ToastModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    providers: [MessageService],
})
export class DashboardComponent implements OnInit {
    user: Bmi;
    loading: boolean = false;

    constructor(
        private assessmentService: AssessmentService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadUserData();
    }

    loadUserData() {
        this.loading = true;
        this.assessmentService.lastBmi().subscribe({
            next: (response) => {
                console.log(response);
                this.user = response;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;

                if (error.status === 401) {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Tempo de sessão expirado. Entre novamente!',
                    });

                    setTimeout(() => {
                        localStorage.removeItem('token');

                        this.router.navigate(['./login']);
                    }, 3100);

                    return;
                }

                if (error.status === 404) {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'Você ainda não realizou sua avaliação física.',
                    });

                    setTimeout(() => {
                        this.router.navigate(['./dashboard/avaliacao-fisica']);
                    }, 3100);

                    return;
                }

                if (error.status !== 401 || error.status !== 404) {
                    this.messageService.add({
                        severity: 'error',
                        detail: error.error.detail,
                    });

                    return;
                }
            },
        });
    }
}
