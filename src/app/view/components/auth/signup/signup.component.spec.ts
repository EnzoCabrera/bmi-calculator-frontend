import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from './signup.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { User } from '../models/user';
import { of } from 'rxjs';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;

    beforeEach(async () => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['signup']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        messageServiceSpy = jasmine.createSpyObj('MessageService', [
            'add',
            'clear',
        ]);

        await TestBed.configureTestingModule({
            declarations: [SignupComponent],
            imports: [
                ReactiveFormsModule,
                MessagesModule,
                ButtonModule,
                CheckboxModule,
                DialogModule,
                InputTextModule,
                PasswordModule,
                ToastModule,
                ProgressSpinnerModule,
            ],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: MessageService, useValue: messageServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disable button when form is empty', () => {
        component.signupForm.setValue({
            fullName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            agreement: false,
        });

        const button = fixture.nativeElement.querySelector(
            '[data-testid=submitButton-signupForm]'
        );

        fixture.detectChanges();

        expect(component.signupForm.invalid).toBeTrue();
        expect(button.disabled).toBeTrue();
    });

    it('should signup with correct data', () => {
        const mockApiResponse = { message: 'User created successfully!' };
        authServiceSpy.signup.and.returnValue(of(mockApiResponse));

        component.signupForm.setValue({
            fullName: 'Teste',
            email: 'teste@email.com',
            password: 'password',
            passwordConfirmation: 'password',
            agreement: true,
        });
        fixture.detectChanges();

        component.signup();

        expect(component.signupForm.valid).toBeTrue();
        expect(authServiceSpy.signup).toHaveBeenCalled();
        expect(authServiceSpy.signup).toHaveBeenCalledWith(
            'teste@email.com',
            'password',
            'Teste',
        );
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
});
