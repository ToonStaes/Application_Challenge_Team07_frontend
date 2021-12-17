import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from '../../category';
import {CategoryService} from '../../category.service';
import {Observable, Subscription} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../security/auth.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  categories$: Subscription = new Subscription();
  deleteCategorie$: Subscription = new Subscription();

  errorMessage: string = '';

  constructor(private categoryService: CategoryService, private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {
    this.getCategories();
    if (!this.authService.isLoggedIn()){
      this.router.navigateByUrl('/login')
    }
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
    this.deleteCategorie$.unsubscribe();
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['category-detail'], {state: {mode: 'add'}});
  }

  edit(id: number | string) {
    //Navigate to form in edit mode
    this.router.navigate(['category-detail'], {state: {id: id, mode: 'edit'}});
  }

  toNonActive(category: Category) {

    category.isActive = false

    this.deleteCategorie$ = this.categoryService.putCategory(category.id , category).subscribe(result => {
      //all went well
      this.getCategories();
      // this.router.navigateByUrl("category-management");
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategories().subscribe(result => this.categories = result);
  }
}
