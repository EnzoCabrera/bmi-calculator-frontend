import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepperModule } from 'primeng/stepper';
import { AssessmentService } from './services/assessment.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-assessment',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        KeyFilterModule,
        StepperModule,
        SelectButtonModule,
        ToastModule,
    ],
    templateUrl: './assessment.component.html',
    styleUrl: './assessment.component.scss',
    providers: [MessageService],
})
export class AssessmentComponent implements OnInit {
    active: number | undefined = 0;

    assessmentForm = new FormGroup({
        weight: new FormControl('', [Validators.required]),
        height: new FormControl('', [Validators.required]),
    });

    loading: boolean = false;

    constructor(
        private assessmentService: AssessmentService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit() {}

    calculateBmi() {
        const height = parseFloat(this.assessmentForm.get('height').value);
        const weight = parseFloat(this.assessmentForm.get('weight').value);

        this.assessmentService.create(height, weight).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    detail: 'IMC calculado com sucesso!',
                });

                this.loading = false;

                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    detail: 'Dados inválidos.',
                });

                this.loading = false;
            },
        });
        console.log(this.assessmentForm.value);
    }

    getErrorMessage(fieldName: string) {
        const field = this.assessmentForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'Campo obrigatório';
        }

        return 'Campo inválido';
    }
}
