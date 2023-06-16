import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, loginPayload } from './login.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginObj: loginPayload = { userId: '', pwd: '' };
  validUser: boolean = true;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginService.isUserLoggedIn = false;
  }
  login() {
    this.loginService.login(this.loginObj).subscribe(
      (response) => {
        if (response.status === 401 || response.user === null) {
          this.validUser = false;
          this.loginService.isUserLoggedIn = false;
          return;
        }

        this.validUser = true;
        this.loginService.isUserLoggedIn = true;
        this.loginService.userData = response.user;
        this.loginService.userDataSubject.next(response);
        this.auth.login(response.user);
        this.router.navigate(['/landing']);
      },
      (err) => {
        this.validUser = false;
        this.loginService.isUserLoggedIn = false;
      }
    );
  }
}
