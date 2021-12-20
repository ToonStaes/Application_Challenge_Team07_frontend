import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  // onSubmit(firstName: String, lastName: String, email: String, message: String ) {
    sendMail(firstName: string, lastName: string, email: string, message:string) {

    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(message)

    Email.send({
    Host : 'smtp.elasticemail.com',
    Username : 'SportAholic.test@email.com',
    Password : 'E897EC137FB391E0553EF27F1BEE92DFF7E5',
    To : email,
    From : `SportAholic.test@email.com`,
    Subject : 'this.model.subject',
    Body :
    `
    <i>This is sent as a feedback from my resume page.</i>
    <br/>
    <b>Name: </b>
    ${firstName}${lastName}

    <br />
    <b>Email: </b>
    <br />
    <b>Subject: </b>
    <br />
    <b>Message:</b>
    ${message}
    <br />
    <br>
    <br>
    <b>~End of Message.~</b>
    `
    })

    console.log("sendmail gelukt, ga naar " + email + " om de test te bekijken")
    this.router.navigateByUrl("/");
    }








    onSubmit(): void{
      var firstName = this.emailForm.value.firstName;
      var lastName = this.emailForm.value.lastName;
      var email = this.emailForm.value.email;
      var message = this.emailForm.value.message;

      // console.log(firstName)
      // console.log(lastName)
      // console.log(email)
      // console.log(message)

      this.sendMail(firstName, lastName, email, message);
    }

}
