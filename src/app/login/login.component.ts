import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from '../services/Authentication Service/auth.service';
import { HeaderComponent } from "../home/header/header.component";
import { FormComponent } from "../shared/form-model/form.component";
import { Payload } from '../model/payload.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    HeaderComponent,
    FormComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
 

  onSubmit() {

    const { username,password } = this.loginForm.value;

    const payload: Payload = {
      username,
      password
    };

    this.authService.authenticate(payload).subscribe({
      
      next: (response) => {

        console.log(response.token);
        alert('Login successful!'); 
        this.redirectToHome();
      },
      error: (err) => {
        
        alert('Login failed. Please try again.');
        console.error('Error:', err);  // Log the error in the console
      }
    });
  }

  redirectToHome(){
    this.router.navigate(['/home']);

  }
}
