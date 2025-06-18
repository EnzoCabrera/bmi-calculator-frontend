import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { of } from 'rxjs';
import { User } from '../models/user';

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

    it('shold login with correct data', () => {

        component.loginForm.setValue({
            email: 'teste@email.com',
            password: 'password',
        });
        component.login();

        fixture.detectChanges();

        expect(component.loginForm.valid).toBeTrue();
        /* expect(authServiceSpy.login).toHaveBeenCalledWith(
            'teste@email.com',
            'password'
        );
        expect(messageServiceSpy.add).toHaveBeenCalledWith({
            severity: 'success',
            detail: 'Login realizado com sucesso!',
        }); */
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
});
