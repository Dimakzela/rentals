import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
