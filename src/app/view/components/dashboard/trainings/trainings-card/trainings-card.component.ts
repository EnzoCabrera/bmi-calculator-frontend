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
    videoPath: string;

    constructor() {}

    ngOnInit() {
        this.videoPath = `../../../../../../assets/exercices-videos/${this.exercice.exercicio.toLowerCase()}.mp4`;
    }
}
