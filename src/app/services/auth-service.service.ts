import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public redirectUrl = "";

  // Keep track of login state
  public isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<string>(
      "https://localhost:7083/api/login/login",
      { username, password }
    );
  }

  getUsername(): string {
  return sessionStorage.getItem('auth-username') || '';
}

  logout(): void {
    sessionStorage.removeItem("auth-username");
    this.isLoggedIn = false;
  }

}
