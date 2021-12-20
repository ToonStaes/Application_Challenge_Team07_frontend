import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  user: User = {
    _id: '0',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    token: '',
    isAdmin: false,
    isSuperAdmin: false,
  };

  isSubmitted: boolean = false;
  errorMessage: string = '';

  isLogin: boolean = false;
  isRegister: boolean = false;
  isLogout: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    switch (this.router.url) {
      case '/login': {
        this.isLogin = true;
        break;
      }
      case '/logout': {
        this.isLogout = true;
        this.authService.deleteToken();
        this.router.navigate(['']);
        break;
      }
      case '/register': {
        this.isRegister = true;
        break;
      }
      default: {
        this.isLogin = true;
        break;
      }
    }
  }

  onSubmit(e: Event): void {
    this.isSubmitted = true;

    if (this.isLogin) {
      this.authService.authenticate(this.user).subscribe(
        (result) => {
          this.errorMessage = '';
          // save access token localstorage
          localStorage.setItem('token', result.access_token);
          localStorage.setItem('id', result.user_id);
          localStorage.setItem('email', this.user.email);
          this.router.navigate(['']);
        },
        (error) => {
          this.errorMessage = 'Email/password not correct!';
          this.isSubmitted = false;
        }
      );
    } else {
      this.authService.register(this.user).subscribe(
        (result) => {
          this.errorMessage = '';
          // send registration email
          e.preventDefault()
          emailjs
            .sendForm(
              'bitworks',
              'registered',
              e.target as HTMLFormElement,
              'user_woIu3evAgyCU440BeG15g'
            )
            .then(
              (result: EmailJSResponseStatus) => {
              },
              (error) => {
                this.errorMessage = error;
              }
            );

          // save access token localstorage
          localStorage.setItem('token', result.access_token);
          localStorage.setItem('id', result.user_id);
          localStorage.setItem('email', this.user.email);
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error)
          this.errorMessage = 'You were not able to register. Maybe try again with a different email';
          this.isSubmitted = false;
        }
      );
    }
  }
}
