import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { of, throwError } from 'rxjs';
import { AssessmentService } from './assessment/services/assessment.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let assessmentServiceSpy: jasmine.SpyObj<AssessmentService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;

    beforeEach(async () => {
        assessmentServiceSpy = jasmine.createSpyObj('AssessmentService', [
            'lastBmi',
        ]);
        messageServiceSpy = jasmine.createSpyObj('messageServiceSpy', [
            'add',
            'clear',
        ]);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [
                DashboardComponent,
                CardModule,
                ChartModule,
                MessagesModule,
                PanelModule,
                SkeletonModule,
                ToastModule,
            ],
            providers: [
                { provide: AssessmentService, useValue: assessmentServiceSpy },
                { provide: MessageService, useValue: messageServiceSpy },
                { provide: Router, useValue: routerSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should load user data', () => {
        const mockData = {
            bmi_status_id: 3,
            bmi_value: 25.47,
            weight: 78,
            height: 1.75,
            user_id: 4,
            id: 11,
            created_at: '2025-05-27T02:54:19.815233',
        };
        assessmentServiceSpy.lastBmi.and.returnValue(of(mockData));

        component.loadUserData();

        expect(component.loading).toBeFalse();
        expect(component.user).toEqual(mockData);
    });

    it('should redirect user to assessment if bmi is null', fakeAsync(() => {
        assessmentServiceSpy.lastBmi.and.returnValue(
            throwError({ status: 404 })
        );
        component.loadUserData();
        tick(3100);

        expect(component.loading).toBeFalse();
        expect(component.user).toEqual(undefined);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['./dashboard/avaliacao-fisica']);
    }));

    it('should redirect user to login if token expired', fakeAsync(() => {
        assessmentServiceSpy.lastBmi.and.returnValue(
            throwError({ status: 401 })
        );
        component.loadUserData();
        tick(3100);

        expect(component.loading).toBeFalse();
        expect(component.user).toEqual(undefined);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['./login']);
    }));
});
