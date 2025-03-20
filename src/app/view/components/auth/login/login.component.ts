import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email = '';
    password = '';
    errorMessage = '';


    valCheck: string[] = ['remember'];

    constructor( private http: HttpClient ,private router: Router, private authService: AuthService, public layoutService: LayoutService) { }


    loginConcluded() {
        if (!this.email || !this.password) {
            this.errorMessage = 'Email e senha são obrigatórios';
            return;
        }

        this.authService.login(this.email, this.password).subscribe(
            (response) => {
                console.log('Login successful:', response);
                this.authService.saveToken(response.access_token);
                this.router.navigate(['/dashboard']);
            },
            (error) => {
                console.error('Login failed:', error);
                this.errorMessage = 'Email ou senha inválidos';
            }
        );
        
    }

    onSignup() {
        this.router.navigate(['/signup']);
    }
}
