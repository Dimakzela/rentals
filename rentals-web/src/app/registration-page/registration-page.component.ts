import {Component, inject} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  
})
export class RegistrationPageComponent {
  
  username: string = '';
  password: string = '';
  confirmPassword: string = '';


    onRegister() {

        const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.username, this.password)
        .then((userCredential: { user: any; }) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error: { code: any; message: any; }) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

  }
}
