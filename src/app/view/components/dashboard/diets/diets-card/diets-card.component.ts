import { LowerCasePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-diets-card',
    standalone: true,
    imports: [ImageModule, TagModule, LowerCasePipe],
    templateUrl: './diets-card.component.html',
    styleUrl: './diets-card.component.scss',
})
export class DietsCardComponent implements OnChanges {
    @Input() meals: any;
    imagePath: string;

    constructor() {}

    ngOnChanges() {
        this.imagePath = `../../../../../../assets/meals/${this.meals.dish}.png`;
    }
}
