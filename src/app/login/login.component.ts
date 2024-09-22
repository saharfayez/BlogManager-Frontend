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
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
 

  onSubmit() {
    //need to check if username or password wrong before after we checl that if the user exists or not
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const success = this.authService.login(username, password);

      if (success) {
        // Navigate to home after successful login
        this.router.navigate(['/home']);
      }
      else if(username!= this.authService.getCurrentUser()){
      }
      
      
      else {
        alert("You don't have an account.Please Sign up First ");
        this.router.navigate(['/signup']);
      }
    }
  }
}
