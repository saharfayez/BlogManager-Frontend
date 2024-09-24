import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payload } from '../../model/payload.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private httpClient: HttpClient) {}

   private url = 'http://localhost:8080';

   private USER_KEY = 'auth-user';

   private  TOKEN_KEY = 'auth-token';


  signup(payload :Payload):Observable<any>{

    console.log("signup");

    return this.httpClient.post(`${this.url}/auth/signup`, payload);

  }

  authenticate(payload: Payload): Observable<any> {
    
    console.log('login');
    return this.httpClient.post(`${this.url}/auth/login`, payload).pipe(
      map((response: any) => {
     
        if (response.token) {
          this.saveToken(response.token);
          this.saveUser(payload.username);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);

    localStorage.removeItem(this.USER_KEY);
  }

  clear():any{
    localStorage.clear();
  }

  saveUser(user:any){

   localStorage.removeItem(this.USER_KEY);

   localStorage.setItem(this.USER_KEY , user);

  }

  saveToken(token:string){

    localStorage.removeItem(this.TOKEN_KEY);

    localStorage.setItem(this.TOKEN_KEY , token);

  }

  getUser():any{

    const user = localStorage.getItem(this.USER_KEY);
    console.log(user);
    return user;

  }

  getToken():string | null  {

    const token = localStorage.getItem(this.TOKEN_KEY);

    console.log(token);
    
    return token;
    
  }


  isLogged():boolean{

    return !!this.getToken();
  }

}
