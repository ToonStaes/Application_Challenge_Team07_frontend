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
  isAdd: boolean = false;
  isEdit: boolean = false;
  adminId: string = '';

  isSubmitted: boolean = false;
  errorMessage: string = '';

  admin$: Subscription = new Subscription();
  postAdmin$: Subscription = new Subscription();
  putAdmin$: Subscription = new Subscription();

  adminForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false),
    isSuperAdmin: new FormControl(false)
  });

  submitForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false),
    isSuperAdmin: new FormControl(false)
  });


  constructor(
    private userService: UserService,
    private router: Router,
    ) {
      this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode == 'add';
      this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
      this.adminId = this.router.getCurrentNavigation()?.extras.state?.id;

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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.admin$.unsubscribe();
    this.postAdmin$.unsubscribe();
    this.putAdmin$.unsubscribe();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postAdmin$ = this.userService
        .postUser(this.adminForm.value)
        .subscribe(
          (result) => {
            //all went well
            this.router.navigateByUrl('admins');
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
    }
    if (this.isEdit) {
      if (this.adminForm.value.password == '****') {
        this.submitForm.value.firstName = this.adminForm.value.firstName;
        this.submitForm.value.lastName = this.adminForm.value.lastName;
        this.submitForm.value.email = this.adminForm.value.email;
        this.submitForm.value.isAdmin = this.adminForm.value.isAdmin;
        this.submitForm.value.isSuperAdmin = this.adminForm.value.isSuperAdmin;

        this.putAdmin$ = this.userService
        .putUser(this.adminId, this.submitForm.value)
        .subscribe(
          (result) => {
            this.router.navigateByUrl('admins');
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
      }
      else{
        this.putAdmin$ = this.userService
        .putUser(this.adminId, this.adminForm.value)
        .subscribe(
          (result) => {
            //all went well
            this.router.navigateByUrl('admins');
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
      }

    }
  }
}

