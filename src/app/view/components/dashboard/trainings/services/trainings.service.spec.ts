import { TestBed } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TrainingsService } from './trainings.service';

describe('TrainingsService', () => {
    let service: TrainingsService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TrainingsService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(TrainingsService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
