import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { AssessmentService } from './assessment/services/assessment.service';
import { Bmi } from './model/bmi';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [PanelModule, CardModule, ChartModule, SkeletonModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    user: Bmi;
    loading: boolean = false;

    constructor(private assessmentService: AssessmentService) {}

    ngOnInit() {
        this.loadUserData();
    }

    loadUserData() {
        this.loading = true;
        this.assessmentService.lastBmi().subscribe((response) => {
            this.user = response;
            this.loading = false;
        });
    }
}
