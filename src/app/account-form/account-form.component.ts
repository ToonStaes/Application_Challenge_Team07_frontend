import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  @Input() isEdit = true;

  isSubmitted: boolean = false;
  errorMessage: string = '';

  userId = 1;

  @Input() user: User = {
    id: '',
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'email@test.com',
    password: 'password',
    isAdmin: false,
    isSuperAdmin: false,
    token: '',
  };

  user$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  accountForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.user.id != '' && this.user.id != '0') {
      this.accountForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
      });
    }
  }

  ngOnInit(): void {
    this.user$ = this.userService
      .getUserById(+this.userId)
      .subscribe((result) => (this.user = result));
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
    this.putUser$.unsubscribe();
  }

  onSubmit(): void {
    if (
      this.user.firstName == this.accountForm.value.firstName &&
      this.user.lastName == this.accountForm.value.lastName &&
      this.user.email == this.accountForm.value.email
    ) {
      this.toggleIsEdit();
    } else {
      this.isSubmitted = true;
      this.user.firstName = this.accountForm.value.firstName;
      this.user.lastName = this.accountForm.value.lastName;
      this.user.email = this.accountForm.value.email;

      if (this.isEdit) {
        this.putUser$ = this.userService
          .putUser(this.userId, this.user)
          .subscribe(
            (result) => {
              //all went well
              this.toggleIsEdit();
            },
            (error) => {
              this.errorMessage = error.message;
            }
          );
      }
    }
  }

  //delay method to give api methods some additional time to complete
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  toggleIsEdit() {
    if (this.user.id != '' && this.user.id != '0') {
      this.isSubmitted = false;

      this.accountForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
      });
    }
    if (this.isEdit) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }
}
