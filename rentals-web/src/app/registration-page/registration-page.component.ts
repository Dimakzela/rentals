import {Component, inject} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {Router} from "@angular/router";
import {Auth} from "@angular/fire/auth";

@Component({
    selector: 'app-registration-page',
    standalone: true,
    imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
    templateUrl: './registration-page.component.html',
    styleUrls: ['./registration-page.component.scss'],

})
export class RegistrationPageComponent {
    private router = inject(Router);
    private auth = inject(Auth);
    isLoading = false;

    username: string = '';
    password: string = '';
    confirmPassword: string = '';


    onRegister() {
        createUserWithEmailAndPassword(this.auth, this.username, this.password)
            .then((userCredential: { user: any; }) => {
                // Signed up
                const user = userCredential.user;
                console.log(user);
                this.router.navigate(['/admin']).then(r => {
                });
            })
            .catch((error: { code: any; message: any; }) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }
}
