import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ComponentService } from '../components.service';

@Component({
    templateUrl: './bmi.component.html',
    styleUrls: ['./bmi.component.scss']
})
export class BmiComponent implements OnInit {
    weight!: number;
    height!: number;
    bmiResult?: number;
    classification?: string;
    loading = false;
    errorMessage = '';

    constructor(private http: HttpClient, private router: Router, private componentService: ComponentService, public layoutService: LayoutService) { }

    ngOnInit() { }

    calculate() {
        if (!this.weight || !this.height) {
            this.errorMessage = 'Preencha peso e altura corretamente.';
            return;
        }

        this.loading = true;

        this.componentService.calculateBMI(this.weight, this.height).subscribe({
            next: (res) => {
                this.bmiResult = res.bmi;
                this.classification = res.classification;
                this.loading = false;
            },
            error: () => {
                this.errorMessage = 'Erro ao calcular IMC. Tente novamente.';
                this.loading = false;
            }

        });
    }
}
