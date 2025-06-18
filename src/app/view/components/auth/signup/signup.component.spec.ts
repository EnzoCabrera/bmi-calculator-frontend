import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SignupComponent } from './signup.component';

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
            'Teste'
        );
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should display "Campo obrigatório" for empty fullName field', () => {
        const fullNameControl = component.signupForm.get(
            'fullName'
        ) as FormControl;
        fullNameControl.setValue('');
        fullNameControl.markAsDirty();
        fullNameControl.markAsTouched();

        fixture.detectChanges();

        expect(fullNameControl.hasError('required')).toBeTrue();
        expect(component.getErrorMessage('fullName')).toBe('Campo obrigatório');
    });

    it('should display "Campo obrigatório" for empty email field', () => {
        const emailControl = component.signupForm.get(
            'email'
        ) as FormControl;
        emailControl.setValue('');
        emailControl.markAsDirty();
        emailControl.markAsTouched();

        fixture.detectChanges();

        expect(emailControl.hasError('required')).toBeTrue();
        expect(component.getErrorMessage('email')).toBe('Campo obrigatório');
    });

    it('should display "Campo obrigatório" for empty password field', () => {
        const passwordControl = component.signupForm.get(
            'password'
        ) as FormControl;
        passwordControl.setValue('');
        passwordControl.markAsDirty();
        passwordControl.markAsTouched();

        fixture.detectChanges();

        expect(passwordControl.hasError('required')).toBeTrue();
        expect(component.getErrorMessage('password')).toBe('Campo obrigatório');
    });

    it('should display "Campo obrigatório" for empty passwordConfirmation field', () => {
        const passwordConfirmationControl = component.signupForm.get(
            'passwordConfirmation'
        ) as FormControl;
        passwordConfirmationControl.setValue('');
        passwordConfirmationControl.markAsDirty();
        passwordConfirmationControl.markAsTouched();

        fixture.detectChanges();

        expect(passwordConfirmationControl.hasError('required')).toBeTrue();
        expect(component.getErrorMessage('passwordConfirmation')).toBe('Campo obrigatório');
    });

    it('should display "E-mail inválido" for invalid email field', () => {
        const emailControl = component.signupForm.get(
            'email'
        ) as FormControl;
        emailControl.setValue('invalid-email');
        emailControl.markAsDirty();
        emailControl.markAsTouched();

        fixture.detectChanges();

        expect(emailControl.hasError('email')).toBeTrue();
        expect(component.getErrorMessage('email')).toBe('E-mail inválido');
    });
});
