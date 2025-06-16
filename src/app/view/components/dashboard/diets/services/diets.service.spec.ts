import { TestBed } from '@angular/core/testing';

import { DietsService } from './diets.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

describe('DietsService', () => {
    let service: DietsService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DietsService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(DietsService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
