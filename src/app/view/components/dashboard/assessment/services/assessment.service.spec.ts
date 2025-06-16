import { TestBed } from '@angular/core/testing';

import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { AssessmentService } from './assessment.service';

describe('AssessmentService', () => {
    let service: AssessmentService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AssessmentService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AssessmentService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
