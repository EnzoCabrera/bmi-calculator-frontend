import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [MessageService],
})
export class SignupComponent {
    signupForm = new FormGroup(
        {
            fullName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            passwordConfirmation: new FormControl('', [Validators.required]),
        },
        { updateOn: 'blur' }
    );

    loading: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    signup() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
        }, 2000);

        if (this.signupForm.get('password').value != this.signupForm.get('passwordConfirmation').value) {
            this.messageService.add({
                severity: 'error',
                detail: 'As senhas não coincidem!',
                icon: 'pi pi-exclamation-triangle',
            });
        }

        if (this.signupForm.invalid || this.signupForm.value == null) {
            this.messageService.add({
                severity: 'error',
                detail: 'Dados incorretos!',
                icon: 'pi pi-exclamation-triangle',
            });
        } else {
            this.router.navigate(['/bmi']);
        }
        /* if (
            !this.email ||
            !this.password ||
            !this.fullName ||
            !this.confirmPassword
        ) {
            this.errorMessage = 'Todos os campos são obrigatórios';
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'As senhas não coincidem';
            return;
        }

        if (this.password.length < 5) {
            this.errorMessage = 'A senha deve ter no mínimo 5 caracteres';
            return;
        }

        this.authService
            .signup(this.email, this.password, this.fullName)
            .subscribe(
                (response) => {
                    alert('Cadastro realizado com sucesso');
                    this.router.navigate(['/bmi']);
                },
                (error) => {
                    this.errorMessage = 'Email já cadastrado';
                }
            ); */
    }

    getErrorMessage(fieldName: string) {
        const field = this.signupForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'Campo obrigatório';
        }

        if (field?.hasError('email')) {
            return 'E-mail inválido';
        }

        return 'Campo inválido';
    }
}
