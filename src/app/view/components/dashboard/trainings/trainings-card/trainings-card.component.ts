import { Component, Input } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-trainings-card',
    standalone: true,
    imports: [DropdownModule, ImageModule],
    templateUrl: './trainings-card.component.html',
    styleUrl: './trainings-card.component.scss',
})
export class TrainingsCardComponent {
    daysOfWeek: any[] = [
        { label: 'Segunda', code: 0 },
        { label: 'Terça', code: 1 },
        { label: 'Quarta', code: 2 },
        { label: 'Quinta', code: 3 },
        { label: 'Sexta', code: 4 },
    ];

    @Input() exercice: any;
}
