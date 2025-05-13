import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchPasswordValidator } from '../validators/matchpassword.validator';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [MessageService],
})
export class SignupComponent {
    signupForm = new FormGroup(
        {
            fullName: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
            ]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
            ]),
            passwordConfirmation: new FormControl('', [
                Validators.required,
                Validators.minLength(5),
            ]),
        },
        { validators: [matchPasswordValidator], updateOn: 'blur' }
    );

    loading: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    signup() {
        const email = this.signupForm.get('email').value;
        const password = this.signupForm.get('password').value;
        const fullName = this.signupForm.get('fullName').value;

        this.loading = true;

        if (this.signupForm.invalid) {
            return;
        }

        this.authService.signup(email, password, fullName).subscribe({
            next: (response) => {
                console.log(response);

                this.messageService.add({
                    severity: 'success',
                    detail: 'Usuário criado com sucesso!',
                });

                this.loading = false;

                this.router.navigate(['/login']);
            },
            error: (error) => {
                console.log(error);

                this.messageService.add({
                    severity: 'error',
                    detail: 'Erro ao criar o usuário!',
                });

                this.loading = false;
            }
        });
    }

    getErrorMessage(fieldName: string) {
        const field = this.signupForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'Campo obrigatório';
        }

        if (field?.hasError('email')) {
            return 'E-mail inválido';
        }

        if (field?.hasError('minlength')) {
            const requiredLength = field.errors
                ? field.errors['minlength']['requiredLength']
                : 5;
            return `O campo deve ter no mínimo ${requiredLength} caracteres`;
        }

        if (this.signupForm.errors?.['matchPassword']) {
            return 'As senhas não conferem';
        }

        return 'Campo inválido';
    }
}
