import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {

    if (this.authService.isLoggedIn) {
        this.router.navigate(['/app-dashboard']);
        }
  }

  ngOnInit() {

  }

  login(email: string, password: string) {
    this.authService.login(email, password);
    this.email = '';
    this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}
