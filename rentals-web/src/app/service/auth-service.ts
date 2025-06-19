import {inject, Injectable} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {signInWithEmailAndPassword} from "firebase/auth";

@Injectable({providedIn: "root"})
export class AuthService {
  private auth = inject(Auth);

  public login( email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public register(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
