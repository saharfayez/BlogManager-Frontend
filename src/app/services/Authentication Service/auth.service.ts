import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payload } from '../../model/payload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private url = 'http://localhost:8080';



  login(username: string, password: string): boolean {
    const user = localStorage.getItem(username);

    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.password === password) {
        // Set the session in localStorage
        localStorage.setItem('session', JSON.stringify({ username }));
        return true;
      }
    }
    alert('Username or Password is Wrong');
    return false; // Invalid username or password
  }

  logout(): void {
    localStorage.removeItem('session');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('session'); // Check if session exists
  }

  getCurrentUser(): string | null {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session).username : null;
  }

  signup(payload :Payload){

    return this.httpClient.post(`${this.url}/auth/signup`, payload);

  }
}
