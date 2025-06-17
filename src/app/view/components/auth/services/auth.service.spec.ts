import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

describe('AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;
    let email: string;
    let password: string;
    let fullName: string;
    let user: User;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AuthService);

        httpController = TestBed.inject(HttpTestingController);

        email = 'teste@email.com';

        password = 'password';

        fullName = 'Teste';

        user = {
            access_token: 'abcdefghijklmnopqrstuvwxyz',
            token_type: 'bearer',
            email: 'teste@email.com',
            name: 'Teste',
        };
    });

    afterEach(() => {
        httpController.verify();
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login with correct data', () => {
        service.login(email, password).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(user);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/users/login`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ email, password });
        req.flush(user);
    });

    it('should show error message when try to login with invalid data', () => {
        let errorMessage = {
            detail: {
                error: 'E-mail ou senha incorretos. Verifique e tente novamente.asdfa',
            },
        };

        service.login(email, password).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(errorMessage);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/users/login`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ email, password });
        req.flush(errorMessage);
    });

    it('should signup with correct data', () => {
        let message = {
            message: 'Cadastro realizado com sucesso!',
        };

        service.signup(email, password, fullName).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(message);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/users/register`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({
            email,
            password,
            full_name: fullName,
        });
        req.flush(message);
    });

    it('should show error message when try to signup with email already used', () => {
        let message = {
            detail: 'Este e-mail já está em uso. Tente outro',
        };

        service.signup(email, password, fullName).subscribe((response) => {
            expect(response).toBeTruthy();
            expect(response).toEqual(message);
        });

        const req = httpController.expectOne(
            `${environment.apiUrl}/users/register`
        );
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({
            email,
            password,
            full_name: fullName,
        });
        req.flush(message);
    });

    it('should save users info into localstorage after login', () => {
        service.saveUserInfo(user);

        expect(localStorage.getItem('token')).toBe(
            'abcdefghijklmnopqrstuvwxyz'
        );
        expect(localStorage.getItem('email')).toBe('teste@email.com');
        expect(localStorage.getItem('name')).toBe('Teste');
    });

    it('should delete users info into localstorage after logout', () => {
        service.logout();

        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('email')).toBeNull();
        expect(localStorage.getItem('name')).toBeNull();
    });

    it('should get user token', () => {
        service.getToken();

        expect(localStorage.getItem('token')).toBe('abcdefghijklmnopqrstuvwxyz')
    })
});
