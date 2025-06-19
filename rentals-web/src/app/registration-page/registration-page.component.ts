import {Component, inject} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Router} from "@angular/router";
import {updateProfile} from "@angular/fire/auth";

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {User} from "@firebase/auth";
import {AuthService} from "../service/auth-service";
import {AppStore} from "../store/app.store";

@Component({
    selector: 'app-registration-page',
    standalone: true,
    imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss'],

})
export class RegistrationPageComponent {
    private router = inject(Router);
    private authService = inject(AuthService);
    private appStore = inject(AppStore);
    public errorMessage: string | null = null;
    isLoading = false;


    name: string = '';
    username: string = '';
    password: string = '';
    confirmPassword: string = '';

    registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


    onRegister() {
        this.authService
            .register(this.username, this.password)
            .then((userCredential: { user: User; }) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);
                updateProfile(user, {displayName: this.name})
                    .then(r => this.router.navigate(['/admin']).then(r => {
                        this.appStore.setState({userId: user.uid, displayName: user.displayName, isLogged: true})
                }));
            })
            .catch((error) => {
                const errorCode = error.code;
                //const errorMessage = error.message;
                console.log(errorCode)


            switch (error.code) {
                case 'auth/email-already-in-use':
                this.errorMessage = 'This email is already taken.';
                break;
                case 'auth/invalid-email':
                this.errorMessage = 'Invalid email address.';
                break;
                case 'auth/weak-password':
                this.errorMessage = 'Password should be at least 6 characters.';
                break;
                default:
                this.errorMessage = 'Registration failed. Please try again.';   
           }

           console.error('Create Account error:', errorCode, error.message);
        });

    }
}
