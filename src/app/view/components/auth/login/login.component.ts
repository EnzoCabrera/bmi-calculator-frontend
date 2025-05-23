import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
            updateOn: 'blur',
        }),
        password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(5)],
            updateOn: 'change',
        }),
    });

    loading: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    login() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;

        this.loading = true;

        this.authService.login(email, password).subscribe({
            next: (response) => {
                this.authService.saveToken(response.access_token);

                this.messageService.add({
                    severity: 'success',
                    detail: 'Login realizado com sucesso!',
                });

                this.loading = false;

                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                console.log(error);

                this.messageService.add({
                    severity: 'error',
                    detail: 'Usuário ou senha inválidos.',
                });

                this.loading = false;
            },
        });
    }

    getErrorMessage(fieldName: string) {
        const field = this.loginForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'Campo obrigatório';
        }

        if (field?.hasError('email')) {
            return 'E-mail inválido';
        }

        return 'Campo inválido';
    }
}
