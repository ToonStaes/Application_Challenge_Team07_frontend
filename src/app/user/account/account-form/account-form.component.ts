import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../../security/user';
import { UserService } from '../../../security/user.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  //state booleans
  @Input() isEdit = true;
  isSubmitted: boolean = false;

  // message that could show on page
  errorMessage: string = '';

  // user
  @Input() user: User = {
    _id: '',
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'email@test.com',
    isAdmin: false,
    isSuperAdmin: false,
    token: '',
    password: '',
  };

  //subscriptions
  user$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

    //reactive form fromcontrols
  accountForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService
  ) {
    // set accountForm's values if needed
    if (this.user._id != '' && this.user._id != '0') {
      this.accountForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
      });
    }
  }

  ngOnInit(): void {
  }

  // unsubscribe from all subscriptions on destroy
  ngOnDestroy(): void {
    this.user$.unsubscribe();
    this.putUser$.unsubscribe();
  }

  onSubmit(): void {
    // if no values have changed just toggle back to the normal page
    if (
      this.user.firstName == this.accountForm.value.firstName &&
      this.user.lastName == this.accountForm.value.lastName &&
      this.user.email == this.accountForm.value.email
    ) {
      this.toggleIsEdit();
    }
    // else put the new user details
    else {
      this.isSubmitted = true;
      this.user.firstName = this.accountForm.value.firstName;
      this.user.lastName = this.accountForm.value.lastName;
      this.user.email = this.accountForm.value.email;

      if (this.isEdit) {
        this.putUser$ = this.userService
          .putUser(this.user._id, this.user)
          .subscribe(
            (result) => {
              this.toggleIsEdit();
            },
            (error) => {
              this.errorMessage = error.message;
            }
          );
      }
    }
  }


  // toggles edit mode on and off
  toggleIsEdit() {
    // set accountform values
    if (this.user._id != '') {
      this.isSubmitted = false;

      this.accountForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
      });
    }

    this.isEdit = !this.isEdit;

  }
}
