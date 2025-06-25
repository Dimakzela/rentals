import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppStore } from '../store/app.store';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private appStore = inject(AppStore);
  private router = inject(Router);

  public name = this.appStore.select('displayName');
  public isLoggedIn = this.appStore.select('isLogged');

  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  filesSelected = false;

  propertyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
      address: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      noOfBedroom: ['', [Validators.required, Validators.min(1)]],
      noOfBathroom: ['', [Validators.required, Validators.min(1)]],
      noOfParking: ['', [Validators.required, Validators.min(0)]],
      contactPerson: ['', Validators.required],
      contactPersonCellNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
      images: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = [];
    this.imagePreviews = [];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      this.filesSelected = true;

      this.propertyForm.patchValue({ images: this.selectedFiles });
      this.propertyForm.get('images')?.updateValueAndValidity();
    }
    else {
      this.filesSelected = false;

      this.propertyForm.patchValue({ images: null });
      this.propertyForm.get('images')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      console.log('Property submitted:', this.propertyForm.value);
      console.log('Selected images:', this.selectedFiles);
      alert('Property submitted successfully!');


      this.propertyForm.reset();
      this.selectedFiles = [];
      this.imagePreviews = [];
      this.fileInput.nativeElement.value = ''; // Clear file input
    }
  }}
