import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-diets',
    standalone: true,
    imports: [ButtonModule, CardModule, ProgressSpinnerModule, ToastModule],
    templateUrl: './diets.component.html',
    styleUrl: './diets.component.scss',
    providers: [MessageService],
})
export class DietsComponent {
    diets: any = null;
    loading: boolean = false;
}
