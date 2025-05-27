import { LowerCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-trainings-card',
    standalone: true,
    imports: [DropdownModule, ImageModule, TagModule, LowerCasePipe],
    templateUrl: './trainings-card.component.html',
    styleUrl: './trainings-card.component.scss',
})
export class TrainingsCardComponent implements OnInit {
    @Input() exercice: any;
    @Input() index: any;
    imagePath: string;
    imageGeneric: string = '../../../../../../assets/layout/images/exercices/2014060c-9ed5-4c64-b772-ab5ebc6fe346.png'

    constructor() {}

    ngOnInit() {
        this.imagePath = `../../../../../../assets/layout/images/exercices-realist/${this.exercice.exercicio.toLowerCase()}.png`;
    }
}
