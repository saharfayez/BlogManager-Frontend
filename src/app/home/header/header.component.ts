import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/Authentication Service/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  currentUser = '';
  isAuthPage = false;


  constructor(
    private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit() {
    this.updateLoginState();
    this.checkUrl();
  }



  updateLoginState() {
    this.isLoggedIn = this.authService.isLogged();
    console.log("logged in :" +this.isLoggedIn);
    
    if (this.isLoggedIn) {
      
      this.currentUser = this.authService.getUser();
      console.log(this.currentUser);

    }
  }



  checkUrl(){
    const currentUrl = this.router.url;
    this.isAuthPage = currentUrl === '/login';
    console.log(this.isAuthPage);
    
  }



  redirectToLogin() {
    console.log('Navigating to login page'); // Debug line
    this.router.navigate(['/login']);
  }



  redirectToSignUp() {
    console.log('Navigating to login page'); // Debug line
    this.router.navigate(['/signup']);
  }



  redirectToAddPost() {
    console.log('Navigating to Add Blog page'); // Debug line
    this.router.navigate(['/add-blog']).then(success => {
      if (success) {
        console.log('Navigation to Add Blog page successful');
      } else {
        console.log('Navigation to Add Blog page failed');
      }
    });
  }



  logout() {
    this.authService.logout();
    this.updateLoginState();
    this.router.navigate(['/login']);
  }
}
