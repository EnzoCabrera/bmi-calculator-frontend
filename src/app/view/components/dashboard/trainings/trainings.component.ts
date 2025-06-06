import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { TrainingsService } from './services/trainings.service';
import { TrainingsCardComponent } from './trainings-card/trainings-card.component';

@Component({
    selector: 'app-trainings',
    standalone: true,
    imports: [
        LowerCasePipe,
        FormsModule,
        ButtonModule,
        CardModule,
        ConfirmDialogModule,
        DropdownModule,
        MessagesModule,
        ProgressSpinnerModule,
        SkeletonModule,
        ToastModule,
        TrainingsCardComponent,
    ],
    templateUrl: './trainings.component.html',
    styleUrl: './trainings.component.scss',
    providers: [ConfirmationService, MessageService],
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
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadTraninings();
    }

    createTraning() {
        this.loading = true;

        this.trainingsService.create().subscribe({
            next: (response) => {
                this.trainings = response.parsed_description;

                const today = this.getCurrentDay();
                this.selectedDay = today;

                this.updateSelectedTraining(today);

                this.messageService.add({
                    severity: 'success',
                    detail: 'Treino criado com sucesso!',
                });

                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    detail: error.error.detail,
                });

                this.loading = false;
            },
        });
    }

    loadTraninings() {
        this.loading = true;

        this.trainingsService.loadById().subscribe({
            next: (response) => {
                this.trainings = response.parsed_description;

                const today = this.getCurrentDay();
                this.selectedDay = today;

                this.updateSelectedTraining(today);

                this.loading = false;
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    detail: error.error.detail,
                });

                this.loading = false;
            },
        });
    }

    recreateTrainings(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message:
                'Você já tem um treino. Tem certeza que deseja gerar outro?',
            header: 'Refazer treino',
            acceptIcon: 'none',
            acceptLabel: 'Sim',
            rejectIcon: 'none',
            rejectLabel: 'Não',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                this.createTraning();
            },
            reject: () => {},
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
