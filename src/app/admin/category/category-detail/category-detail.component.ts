import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  // state booleans
  isAdd: boolean = false;
  isEdit: boolean = false;
  isSubmitted: boolean = false;

  // id
  categoryId: string = '';

  //message that could be displayed on the page
  errorMessage: string = '';

  // subscriptions
  category$: Subscription = new Subscription();
  postCategory$: Subscription = new Subscription();
  putCategory$: Subscription = new Subscription();

  // reactive form fromcontrol
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    isActive: new FormControl('')
  });

  constructor(private router: Router, private categoryService: CategoryService) {
    // get values from router
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode == 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.categoryId = this.router.getCurrentNavigation()?.extras.state?.id;

    //get category & fill the formcontrol
    if (this.categoryId != null && this.categoryId != '') {
      this.category$ = this.categoryService
        .getCategoryById(this.categoryId)
        .subscribe((result) => {
          this.categoryForm.setValue({
            name: result.name,
            isActive: result.isActive,
          });
        });
    }
    // ensure the formcontrols have their default values
    if (this.isAdd) {
      this.categoryForm.setValue({
        name: '',
        isActive: true,
      });
    }
  }

  ngOnInit(): void {}

  // unsubscribe on destroy
  ngOnDestroy(): void {
    this.category$.unsubscribe();
    this.postCategory$.unsubscribe();
    this.putCategory$.unsubscribe();
  }

  // post or put the category-object
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postCategory$ = this.categoryService
        .postCategory(this.categoryForm.value)
        .subscribe(
          (result) => {
            this.router.navigateByUrl('categories');
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
    }
    if (this.isEdit) {
      this.putCategory$ = this.categoryService
        .putCategory(this.categoryId, this.categoryForm.value)
        .subscribe(
          (result) => {
            //all went well
            this.router.navigateByUrl('categories');
          },
          (error) => {
            this.errorMessage = error.message;
          }
        );
    }
  }
}
