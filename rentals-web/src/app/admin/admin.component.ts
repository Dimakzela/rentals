import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AppStore} from "../store/app.store";

@Component({
  selector: 'app-admin',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  private appStore = inject(AppStore);
  private router = inject(Router);

  public name  = this.appStore.select('displayName');
  public isLoggedIn  = this.appStore.select('isLogged');

  ngOnInit(): void {
    if(!this.isLoggedIn()) {
      this.router.navigate(['/login']).then(r => {});
    }
  }

}
