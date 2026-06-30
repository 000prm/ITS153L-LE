import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { TokenStorageService } from './services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public auth: AuthServiceService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.auth.isLoggedIn = !!this.tokenStorage.getToken();

  }

  logout() {

    this.tokenStorage.signOut();

    this.auth.logout();

    this.router.navigate(['/login']);

}
}
