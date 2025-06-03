import {Component, inject} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from "@angular/router";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Router} from "@angular/router";
import {Auth} from "@angular/fire/auth";

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink, ReactiveFormsModule],
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],

})
export class LoginPageComponent {
    private router = inject(Router);
    private auth = inject(Auth);
    public errorMessage = null;

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    onLogin() {
        const email = this.loginForm.controls['email']?.value?.toString() || '';
        const password = this.loginForm.controls['password']?.value?.toString() || '';
        signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential: { user: any; }) => {
                const user = userCredential.user;
                console.log(user);
                this.router.navigate(['/admin']).then(r => {
                });
            })
            .catch((error: { code: any; message: any; }) => {
                const errorCode = error.code;
                console.log(errorCode)
                this.errorMessage = error.message;
            });

    }
}
