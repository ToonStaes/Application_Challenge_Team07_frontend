import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import '../../assets/e-mail/smtp.js';
declare let Email: any;

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  isSubmitted: boolean = false;
  errorMessage: string = '';
  nameChangeMessage: string = '';

  emailForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs
      .sendForm(
        'bitworks',
        'contact',
        e.target as HTMLFormElement,
        'user_woIu3evAgyCU440BeG15g'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
        },
        (error) => {
          this.errorMessage = error
        }
      );
    this.router.navigateByUrl('/');
  }



}
