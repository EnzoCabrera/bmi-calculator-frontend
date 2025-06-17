import { Bmi } from './../../model/bmi';
import { TestBed } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { AssessmentService } from './assessment.service';
import { environment } from 'src/environments/environment.prod';

describe('AssessmentService', () => {
    let service: AssessmentService;
    let httpController: HttpTestingController;
    let height: number;
    let weight: number;
    let bmi: Bmi;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AssessmentService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AssessmentService);
        httpController = TestBed.inject(HttpTestingController);

        height = 1.93;
        weight = 98;
        bmi = {
            bmi_status_id: 3,
            bmi_value: 26.31,
            weight: 98,
            height: 1.93,
            user_id: 9,
            id: 12,
            created_at: '2025-05-27T21:58:39.858670',
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should calculate bmi status when all data are informed', () => {
        service.create(height, weight).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(bmi);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/bmi/create`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ height, weight });
        req.flush(bmi);
    });

    it('should show error message when try to calculate bmi status with invalid data', () => {
        let errorMessage = {
            detail: 'Informe um peso válido (maior que zero).',
        };

        service.create(height, 0).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(errorMessage);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/bmi/create`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ height, weight: 0 });
        req.flush(errorMessage);
    });

    it('should get last bmi using user id', () => {
        service.lastBmi().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(bmi);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/bmi/latest-by-id`
        );
        expect(req.request.method).toBe('GET');
        req.flush(bmi);
    });

    it('should show error message when user id not found', () => {
        let errorMessage = {
            detail: 'Não conseguimos encontrar seu perfil. Verifique suas informações.',
        };

        service.lastBmi().subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(errorMessage);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/bmi/latest-by-id`
        );
        expect(req.request.method).toBe('GET');
        req.flush(errorMessage);
    });
});
