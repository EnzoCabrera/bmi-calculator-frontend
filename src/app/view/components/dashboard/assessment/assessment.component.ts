import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { SelectButtonModule } from 'primeng/selectbutton';

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
        StepperModule,
        SelectButtonModule
    ],
    templateUrl: './assessment.component.html',
    styleUrl: './assessment.component.scss',
})
export class AssessmentComponent implements OnInit {
    active: number | undefined = 0;

    stateOptions: any[] = [
        { label: '1 hora', value: 1 },
        { label: '2 horas', value: 2 },
        { label: '3 horas', value: 3 }
    ];

    assessmentForm = new FormGroup(
            {
                gender: new FormControl('male', [Validators.required]),
                weight: new FormControl('', [Validators.required]),
                height: new FormControl('', [Validators.required]),
                freeTime: new FormControl('', [Validators.required])
            }
        );

    loading: boolean = false;

    ngOnInit() {}

    calculateBmi() {
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
