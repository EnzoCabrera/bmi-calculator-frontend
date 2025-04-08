import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
})
export class LoginComponent {
    loginForm = new FormGroup(
        {
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        },
        { updateOn: 'blur' }
    );

    loading: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        public layoutService: LayoutService,
        private messageService: MessageService
    ) {
    }

    login() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
        }, 2000);

        if (this.loginForm.invalid || this.loginForm.value == null) {
            this.messageService.add({
                severity: 'error',
                detail: 'Usuário ou senha incorretos!',
                icon: 'pi pi-exclamation-triangle',
            });
        } else {

            this.router.navigate(['/bmi']);
        }


        /* if (!this.email || !this.password) {
            this.errorMessage = 'Email e senha são obrigatórios';
            return;
        }

        this.authService.login(this.email, this.password).subscribe(
            (response) => {
                console.log('Login successful:', response);
                this.authService.saveToken(response.access_token);
                this.router.navigate(['/bmi']);
            },
            (error) => {
                console.error('Login failed:', error);
                this.errorMessage = 'Email ou senha inválidos';
            }
        ); */
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
