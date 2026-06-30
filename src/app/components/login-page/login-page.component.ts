import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  }

  constructor(
    private authService: AuthServiceService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.authService.isLoggedIn = true;
      this.router.navigate([this.authService.redirectUrl]);
    }
  }

  onSubmit() {
    const { username, password } = this.form;

    this.http.post("https://localhost:7083/api/Login/login",
      { userName: username, password: password },
      { responseType: 'text' }
    ).subscribe({
      next: (token: string) => {

  this.tokenStorage.saveToken(token);
this.tokenStorage.saveUsername(username);

this.authService.isLoggedIn = true;

  this.router.navigate([this.authService.redirectUrl || '/']);

},
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }

}
