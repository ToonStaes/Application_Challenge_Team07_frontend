import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {

  // arrayw of users
  admins: User[] = [];

  //state boolean
  showUsers: boolean = false;

  // messages that could appear on the page
  errorMessage: string = '';

  //subscriptions
  admins$: Subscription = new Subscription();
  deleteAdmin$: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    // get all admins & redirect anyone not logged in to the login page
    this.getAdmins();
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }

  }

  // unsubscribe from any subscriptions on destroy
  ngOnDestroy(): void {
    this.admins$.unsubscribe();
    this.deleteAdmin$.unsubscribe();
  }

  getAdmins(){
    this.admins$ = this.userService
      .getUsers()
      .subscribe((result) => {
        // if showusers is true, get all available users
        if (this.showUsers) {
          this.admins = result;
        }
        //else get only people marked as admins
        else{
          // clear the array to prevent issues with the push method
          this.admins = [];
          result.forEach(user => {
            if (user.isAdmin || user.isSuperAdmin) {
              this.admins.push(user);
            }
          });
        }
      });
  }

  // toggles the show users bool
  toggleShowUsers(){
    this.showUsers = !this.showUsers;
    this.getAdmins();
  }

  // navigate to add form
  add() {
    this.router.navigate(['admin-form'], { state: { mode: 'add' } });
  }

    // navigate to edit form
  edit(id: string) {
    this.router.navigate(['admin-form'], {
      state: { id: id, mode: 'edit' }
    });
  }

  // delete the user
  delete(id: string){
    this.deleteAdmin$ = this.userService.deleteUser(id).subscribe(result => {
      this.getAdmins();
    }, error => {
      this.errorMessage = error.message;
    });
  }

}
