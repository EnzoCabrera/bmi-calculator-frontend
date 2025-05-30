import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { DietsCardComponent } from './diets-card/diets-card.component';
import { DietsService } from './services/diets.service';

@Component({
    selector: 'app-diets',
    standalone: true,
    imports: [
        DietsCardComponent,
        ButtonModule,
        CardModule,
        ChipsModule,
        DropdownModule,
        ProgressSpinnerModule,
        MessagesModule,
        ToastModule,
        SkeletonModule,
        FormsModule,
        LowerCasePipe,
    ],
    templateUrl: './diets.component.html',
    styleUrl: './diets.component.scss',
    providers: [MessageService],
})
export class DietsComponent implements OnInit {
    diets: any;
    intolerances: string[] = [];
    selectedDiets: any;
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
        private dietsService: DietsService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadDiets();
    }

    createDiet() {
        this.loading = true;

        this.dietsService.create(this.intolerances).subscribe({
            next: (res) => {
                this.diets = res.parsed_description;

                this.messageService.add({
                    severity: 'success',
                    detail: 'Dieta criada com sucesso!',
                });

                this.loading = false;
            },
            error: (e) => {
                this.messageService.add({
                    severity: 'error',
                    detail: e.message,
                });
            },
        });
    }

    loadDiets() {
        this.loading = true;

        this.dietsService.loadById().subscribe({
            next: (res) => {
                this.diets = res.parsed_description;

                const today = this.getCurrentDay();
                this.selectedDay = today;

                this.updateSelectedDiets(today);

                console.log(this.diets);

                this.loading = false;
            },
            error: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao carregar dieta.',
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

    updateSelectedDiets(day: string) {
        if (day === 'Sábado' || day === 'Domingo') {
            this.selectedDiets = null;
            return;
        }

        const currentDiet = this.diets.find(
            (t) => t.day.toLowerCase() === day.toLowerCase()
        );
        this.selectedDiets = currentDiet;
    }
}
