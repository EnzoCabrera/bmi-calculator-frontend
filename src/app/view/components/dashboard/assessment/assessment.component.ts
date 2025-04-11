import { Component, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-assessment',
    standalone: true,
    imports: [StepsModule, ButtonModule, FormsModule],
    templateUrl: './assessment.component.html',
    styleUrl: './assessment.component.scss',
})
export class AssessmentComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Gênero', routerLink: '' },
            { label: 'Peso', routerLink: '' },
            { label: 'Altura', routerLink: '' },
        ];
    }
}
