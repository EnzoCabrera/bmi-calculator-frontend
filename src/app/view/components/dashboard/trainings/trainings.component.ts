import { TrainingsCardComponent } from './trainings-card/trainings-card.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TrainingsService } from './services/trainings.service';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe } from '@angular/common';

@Component({
    selector: 'app-trainings',
    standalone: true,
    imports: [
        TrainingsCardComponent,
        ButtonModule,
        CardModule,
        DropdownModule,
        MessagesModule,
        ProgressSpinnerModule,
        SkeletonModule,
        ToastModule,
        FormsModule,
        LowerCasePipe,
    ],
    templateUrl: './trainings.component.html',
    styleUrl: './trainings.component.scss',
    providers: [MessageService],
})
export class TrainingsComponent implements OnInit {
    trainings: any[];
    selectedTrainings: any;
    selectedDay: string;
    daysOfWeek = [
        { label: 'Domingo', value: 'Domingo' },
        { label: 'Segunda', value: 'Segunda' },
        { label: 'Terça', value: 'Terça' },
        { label: 'Quarta', value: 'Quarta' },
        { label: 'Quinta', value: 'Quinta' },
        { label: 'Sexta', value: 'Sexta' },
        { label: 'Sábado', value: 'Sábado' },
    ];
    loading: boolean = false;

    constructor(
        private trainingsService: TrainingsService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadTraninings();
    }

    createTraning() {
        this.loading = true;

        this.trainingsService.create().subscribe({
            next: (res) => {
                this.trainings = res.parsed_description;

                this.messageService.add({
                    severity: 'success',
                    detail: 'Treino criado com sucesso!',
                });

                this.loading = false;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao criar treino',
                });
            },
        });

        this.loadTraninings();
    }

    loadTraninings() {
        this.loading = true;

        this.trainingsService.loadById().subscribe({
            next: (res) => {
                this.trainings = res.parsed_description;

                const today = this.getCurrentDay();
                this.selectedDay = today;

                this.updateSelectedTraining(today);

                this.loading = false;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao carregar treino',
                });

                this.loading = false;
            },
        });
    }

    getCurrentDay() {
        const dayOfWeek = [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
        ];
        return dayOfWeek[new Date().getDay()];
    }

    updateSelectedTraining(day: string) {
        if (day === 'Sábado' || day === 'Domingo') {
            this.selectedTrainings = null;
            return;
        }

        const currentTraining = this.trainings.find(
            (t) => t.day.toLowerCase() === day.toLowerCase()
        );
        this.selectedTrainings = currentTraining;
    }
}
