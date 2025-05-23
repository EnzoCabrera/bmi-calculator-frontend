import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { AssessmentService } from './assessment/services/assessment.service';
import { Bmi } from './model/bmi';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [PanelModule, CardModule, ChartModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    user: Bmi;

    constructor(private assessmentService: AssessmentService) {}

    ngOnInit() {
        this.loadUserData();
    }

    loadUserData() {
        this.assessmentService.lastBmi().subscribe((response) => {
            this.user = response;

            console.log(response);
        });
    }
}
