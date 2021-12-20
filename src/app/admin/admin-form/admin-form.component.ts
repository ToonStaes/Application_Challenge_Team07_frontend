import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {
  //state booleans
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;

  // id
  adminId: string = '';

  // message that could show on page
  errorMessage: string = '';

  //subscriptions
  admin$: Subscription = new Subscription();
  postAdmin$: Subscription = new Subscription();
  putAdmin$: Subscription = new Subscription();

  //reactive form fromcontrols
  adminForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false),
    isSuperAdmin: new FormControl(false)
  });

  constructor(
    private userService: UserService,
    private router: Router
  )
  {
    // get all state variables
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode == 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.adminId = this.router.getCurrentNavigation()?.extras.state?.id;

    // if the form will be used to edit fill it with the called data
    // password will always be displayed by 4 stars ****
    if (this.isEdit) {
      this.admin$ = userService.getUserById(this.adminId).subscribe((result) =>
      {
        this.adminForm.setValue({
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          password: "****",
          isAdmin: result.isAdmin,
          isSuperAdmin: result.isSuperAdmin
        });
      });
    }
  }

  ngOnInit(): void {}

  // unsubscribe from all subscriptions on destroy
  ngOnDestroy(): void
  {
    this.admin$.unsubscribe();
    this.postAdmin$.unsubscribe();
    this.putAdmin$.unsubscribe();
  }

  // when the form is submitted submit the new or changed user-object
  onSubmit(): void
  {
    this.isSubmitted = true;
    // add a new user
    if (this.isAdd) {
      this.postAdmin$ = this.userService
        .postUser(this.adminForm.value)
        .subscribe(
          (result) => {
            this.router.navigateByUrl('admins');
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
    }
    if (this.isEdit) {
      if (this.adminForm.value.password == '****') {
        // if the password is unchanged create a version of the form withoud password (submitform) and submit that
        this.putUser(this.createAlt());
      }
      else{
        // submit the changed user
        this.putUser(this.adminForm);
      }

    }
  }

  // to submit a user object without the password
  createAlt()
  {
    // submitform for when no new password is given
    let submitForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      isAdmin: new FormControl(false),
      isSuperAdmin: new FormControl(false)
    });

    submitForm.value.firstName = this.adminForm.value.firstName;
    submitForm.value.lastName = this.adminForm.value.lastName;
    submitForm.value.email = this.adminForm.value.email;
    submitForm.value.isAdmin = this.adminForm.value.isAdmin;
    submitForm.value.isSuperAdmin = this.adminForm.value.isSuperAdmin;

    return submitForm;
  }

  // update an existing user
  putUser(fromGroup: FormGroup)
  {
    this.putAdmin$ = this.userService
      .putUser(this.adminId, fromGroup.value)
      .subscribe((result) => {
        this.router.navigateByUrl('admins');
      },
      (error) => {
        this.errorMessage = error.message;
      });
  }
}

