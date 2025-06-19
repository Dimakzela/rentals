import {Component, inject} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from "@angular/router";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth-service";
import {AppStore} from "../store/app.store";
import {User} from "@firebase/auth";

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink, ReactiveFormsModule],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],

})
export class LoginPageComponent {
    private router = inject(Router);
    private authService = inject(AuthService);
    private appStore = inject(AppStore);
    public errorMessage: string | null = null;

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    onLogin() {
        const email = this.loginForm.controls['email']?.value?.toString() || '';
        const password = this.loginForm.controls['password']?.value?.toString() || '';
        this.authService.login(email, password)
            .then((userCredential: { user: User; }) => {
                const user = userCredential.user;
                this.appStore.setState({userId: user.uid, displayName: user.displayName, isLogged: true})
                console.log(user);
                this.router.navigate(['/admin']).then(r => {
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode)
                //this.errorMessage = error.message;

                //Custom error message mapping
                switch (errorCode) {
                    case 'auth/network-request-failed':
                        this.errorMessage = 'Network error. Please check your internet connection.';
                        break;
                    case 'auth/wrong-password':
                        this.errorMessage = 'Incorrect password. Please try again.';
                        break;
                    case 'auth/user-not-found':
                        this.errorMessage = 'No user found with this email.';
                        break;
                    case 'auth/invalid-email':
                        this.errorMessage = 'The email address is not valid.';
                        break;
                    default:
                        this.errorMessage = 'Login failed. Please try again later.';
                }

                 console.error('Login error:', errorCode, error.message);
  
            });

    }
}
