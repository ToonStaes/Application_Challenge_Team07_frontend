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

  admins: User[] = [];
  showUsers: boolean = false;

  errorMessage: string = '';

  admins$: Subscription = new Subscription();
  deleteAdmin$: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getAdmins();
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }

  }

  ngOnDestroy(): void {
    this.admins$.unsubscribe();
    this.deleteAdmin$.unsubscribe();
  }

  getAdmins(){
    this.admins$ = this.userService
      .getUsers()
      .subscribe((result) => {

        if (this.showUsers) {
          this.admins = result;
        }
        else{
          this.admins = [];
        result.forEach(user => {
          if (user.isAdmin || user.isSuperAdmin) {
            this.admins.push(user);
          }

        });
        }

      });
  }

  toggleShowUsers(){
    if (this.showUsers) {
      this.showUsers = false;
    }else{
      this.showUsers = true;
    }
    this.getAdmins();
  }

  add() {
    this.router.navigate(['admin-form'], { state: { mode: 'add' } });
  }

  edit(id: string) {
    this.router.navigate(['admin-form'], {
      state: { id: id, mode: 'edit' }
    });
  }

  delete(id: string){
    this.deleteAdmin$ = this.userService.deleteUser(id).subscribe(result => {
      this.getAdmins();
    }, error => {
      this.errorMessage = error.message;
    });
  }

}
