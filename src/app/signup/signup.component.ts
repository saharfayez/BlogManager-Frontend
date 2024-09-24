import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HeaderComponent } from "../home/header/header.component";
import { FormComponent } from "../shared/form-model/form.component";
import { Payload } from '../model/payload.model';
import { AuthService } from '../services/Authentication Service/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HeaderComponent,
    FormComponent
],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
 

  constructor(private authService : AuthService ,private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    const { username,password } = this.signupForm.value;
    const payload: Payload = {
      username,
      password
    };

    this.authService.signup(payload).subscribe({
      next: (response) => {
        console.log(response.id);
        console.log(response.username);
        alert('Signup successful!');
        this.redirectToLogin();
      },
      error: (err) => {
        alert('Signup failed. Please try again.');
        console.error(err);
      }
    });
    
  }

  redirectToLogin(){

    this.router.navigate(['/login']);
      
  }

}
