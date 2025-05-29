import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { Bmi } from '../model/bmi';
import { AssessmentService } from './services/assessment.service';

@Component({
    selector: 'app-assessment',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CardModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        KeyFilterModule,
        SelectButtonModule,
        StepperModule,
        SkeletonModule,
        ToastModule,
    ],
    templateUrl: './assessment.component.html',
    styleUrl: './assessment.component.scss',
    providers: [MessageService],
})
export class AssessmentComponent implements OnInit {
    bmi: Bmi;
    active: number | undefined = 0;

    assessmentForm = new FormGroup({
        weight: new FormControl('', [Validators.required, Validators.min(1)]),
        height: new FormControl('', [Validators.required, Validators.min(1)]),
    });

    loading: boolean = false;

    constructor(
        private assessmentService: AssessmentService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadBmi();
    }

    calculateBmi() {
        const height = parseFloat(this.assessmentForm.get('height').value);
        const weight = parseFloat(this.assessmentForm.get('weight').value);

        this.assessmentService.create(height, weight).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    detail: 'IMC calculado com sucesso!',
                });

                this.loading = false;

                this.router.navigate(['/dashboard']);
            },
            error: (e) => {
                this.messageService.add({
                    severity: 'error',
                    detail: 'Erro ao calcular IMC.',
                });

                this.loading = false;
            },
        });
        console.log(this.assessmentForm.value);
    }

    loadBmi() {
        this.loading = true;

        this.assessmentService.lastBmi().subscribe({
            next: (res) => {
                this.bmi = res;
                console.log(this.bmi);
                this.loading = false;
            },
            error: (e) => {
                this.loading = false;

                if (e.status === 401) {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Tempo de sessão expirado. Entre novamente!',
                    });

                    setTimeout(() => {
                        localStorage.removeItem('token');

                        this.router.navigate(['./login']);
                    }, 3100);
                }

                if (e.status === 404) {
                    this.messageService.add({
                        severity: 'info',
                        detail: 'Digite seus dados.',
                    });
                }
            },
        });
    }

    getErrorMessage(fieldName: string) {
        const field = this.assessmentForm.get(fieldName);

        if (field.hasError('min')) {
            if (fieldName === 'height') {
                return 'A altura deve ser maior que 0';
            }

            return 'O peso deve ser maior que 0';
        }

        if (field?.hasError('required')) {
            return 'Campo obrigatório';
        }

        return 'Campo inválido';
    }

    newAssessment() {
        this.loading = true;

        this.messageService.add({
            severity: 'info',
            detail: 'Digite seus dados novamente.',
        });

        setInterval(() => {
            this.bmi = undefined;
            this.loading = false;
        }, 3100);
    }
}
