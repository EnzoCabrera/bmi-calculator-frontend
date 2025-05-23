import { TrainingsCardComponent } from './trainings-card/trainings-card.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TrainingsService } from './services/trainings.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-trainings',
    standalone: true,
    imports: [
        TrainingsCardComponent,
        ButtonModule,
        CardModule,
        ProgressSpinnerModule,
        ToastModule,
    ],
    templateUrl: './trainings.component.html',
    styleUrl: './trainings.component.scss',
    providers: [MessageService],
})
export class TrainingsComponent implements OnInit {
    trainings: any = null;
    exercices: any[] = [];
    loading: boolean = false;

    constructor(private trainingsService: TrainingsService) {}

    ngOnInit() {
        this.loadTraninings();
    }

    createTraning() {
        this.loading = true;

        this.trainingsService.create().subscribe((res) => {
            console.log(res);

            this.trainings = res;

            this.loading = false;
        });

        this.loadTraninings();
    }
    loadTraninings() {
        this.trainingsService.loadById().subscribe((res) => {
            this.trainings = res;
            console.log(res);
        });
    }
}
