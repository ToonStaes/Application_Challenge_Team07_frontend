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

  // status$: Subscription = new Subscription();
  // postStatus$: Subscription = new Subscription();
  // putStatus$: Subscription = new Subscription();

  // reactive form
  emailForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // onSubmit(firstName: String, lastName: String, email: String, message: String ) {
    onSubmit() {

    Email.send({
    Host : 'smtp.elasticemail.com',
    Username : 'SportAholic.test@email.com',
    Password : 'E897EC137FB391E0553EF27F1BEE92DFF7E5',
    To : 'jo.naulaerts.tm@gmail.com',
    From : `SportAholic.test@email.com`,
    Subject : 'this.model.subject',
    Body :
    `
    <i>This is sent as a feedback from my resume page.</i>
    <br/>
    <b>Name: </b>

    <br />
    <b>Email: </b>
    <br />
    <b>Subject: </b>
    <br />
    <b>Message:</b>
    <br />
    <br>
    <br>
    <b>~End of Message.~</b>
    `
    })

    this.router.navigateByUrl("/");
    }

}
