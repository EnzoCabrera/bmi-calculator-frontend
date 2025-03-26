import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']

})
export class SignupComponent {
    email = '';
    password = '';
    fullName = '';
    confirmPassword = '';
    errorMessage = '';


    valCheck: string[] = ['remember'];



    constructor(private router: Router, public layoutService: LayoutService, private authService: AuthService) { }

    signupConcluded() {
        if (!this.email || !this.password || !this.fullName || !this.confirmPassword) {
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

        this.authService.signup(this.email, this.password, this.fullName).subscribe(
            (response) => {
                alert('Cadastro realizado com sucesso');
                this.router.navigate(['/bmi']);
            },
            (error) => {
                this.errorMessage = 'Email já cadastrado';
            }
        );
    }
}
