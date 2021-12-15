import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import {Subscription} from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  isAdd: boolean = false;
  isEdit: boolean = false;
  categoryId: number = 0;


  // category: Category = { id: 0, name: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  category$: Subscription = new Subscription();
  postCategory$: Subscription = new Subscription();
  putCategory$: Subscription = new Subscription();

  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    isActive: new FormControl('')
  });

  constructor(private router: Router, private categoryService: CategoryService) {

    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.categoryId = +this.router.getCurrentNavigation()?.extras.state?.id;


    if (this.categoryId != null && this.categoryId > 0) {
      this.category$ = this.categoryService.getCategoryById(this.categoryId).subscribe(result => {
        this.categoryForm.setValue({
          name: result.name,
          isActive: result.isActive
        });
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
    this.postCategory$.unsubscribe();
    this.putCategory$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postCategory$ = this.categoryService.postCategory(this.categoryForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("category-management");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putCategory$ = this.categoryService.putCategory(this.categoryId, this.categoryForm.value).subscribe(result => {
                //all went well
                this.router.navigateByUrl("category-management");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }
}
