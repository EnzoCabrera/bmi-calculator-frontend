import { LowerCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-diets-card',
    standalone: true,
    imports: [ImageModule, TagModule, LowerCasePipe],
    templateUrl: './diets-card.component.html',
    styleUrl: './diets-card.component.scss',
})
export class DietsCardComponent implements OnInit {
    @Input() meals: any;
    imagePath: string;

    contructor() {
        console.log(this.meals);
    }

    ngOnInit() {
        this.imagePath = `../../../../../../assets/layout/images/meals/${this.meals.dish.toLowerCase()}.png`;
    }
}
