import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { of, throwError } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let messageServiceSpy: jasmine.SpyObj<MessageService>;

    beforeEach(async () => {
        authServiceSpy = jasmine.createSpyObj('AuthService', [
            'login',
            'saveUserInfo',
        ]);
        messageServiceSpy = jasmine.createSpyObj('MessageService', [
            'add',
            'clear',
        ]);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                ReactiveFormsModule,
                MessagesModule,
                ButtonModule,
                InputTextModule,
                PasswordModule,
                ToastModule,
                ProgressSpinnerModule,
                BrowserAnimationsModule,
            ],
            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: MessageService, useValue: messageServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disable button when form is empty', () => {
        component.loginForm.setValue({
            email: '',
            password: '',
        });

        const button = fixture.nativeElement.querySelector(
            '[data-testid=submitButton-loginForm]'
        );

        fixture.detectChanges();

        expect(component.loginForm.invalid).toBeTrue();
        expect(button.disabled).toBeTrue();
    });

    it('should login with correct data', () => {
        const user: User = {
            access_token: 'abcdefghijklmnopqrstuvwxyz',
            token_type: 'bearer',
            email: 'teste@email.com',
            name: 'Teste',
        };

        authServiceSpy.login.and.returnValue(of(user));

        component.loginForm.setValue({
            email: 'teste@email.com',
            password: 'password',
        });

        component.login();

        expect(component.loginForm.valid).toBeTrue();
        expect(authServiceSpy.login).toHaveBeenCalled();
        expect(authServiceSpy.login).toHaveBeenCalledWith(
            'teste@email.com',
            'password'
        );
        expect(authServiceSpy.saveUserInfo).toHaveBeenCalledWith(user);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('should display "Campo obrigatório" for empty password field', fakeAsync(() => {
        const passwordControl = component.loginForm.get(
            'password'
        ) as FormControl;
        passwordControl.setValue('');
        passwordControl.markAsDirty();
        passwordControl.markAsTouched();

        fixture.detectChanges();
        tick();

        expect(passwordControl.hasError('required')).toBeTrue();
        expect(component.getErrorMessage('password')).toBe('Campo obrigatório');
    }));
});
