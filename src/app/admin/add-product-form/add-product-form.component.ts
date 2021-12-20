import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product';
import { log } from 'console';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/category';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private angularFireStorage: AngularFireStorage
  ) {
    this.isAdd = this.router.url === '/newProduct';
    this.isEdit = !this.isAdd;
  }

  //booleans
  isSubmitted: boolean = false;
  isImageChanged: boolean = false;
  isAdd: boolean = false;
  isEdit: boolean = false;

  //Massages to potentially display on the page
  errorMessage: string = '';

  // id's & values
  productId: string = '';
  imageSrc: string = '';

  //empty product object
  inputProduct = {} as Product;

   // categories for select
   categoriesFromDB: Category[] = [];
   categories: Category[] = [];
   selected: string = '';

  //subscriptions
  postProduct$: Subscription = new Subscription();
  putProduct$: Subscription = new Subscription();
  categories$: Subscription = new Subscription();

  //reactive from formcontrol
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    stockCount: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  // Uploading image
  ref: AngularFireStorageReference | undefined;
  task: AngularFireUploadTask | undefined;
  filePath = `productImages/`;
  imageFile: any;
  uploadProgress: number | undefined;


  ngOnInit(): void {
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null && id != '') {
        this.productId = id;
        this.productService
          .getProductById(this.productId)
          .subscribe((result) => {
            this.inputProduct = result;
            this.imageSrc = result.imageLocation;
            this.selected = result.category._id!;
            this.productForm.patchValue({
              name: result.name,
              description: result.description,
              stockCount: result.stockCount,
              imageUrl: result.imageLocation,
              categoryId: result.category._id!,
              price: result.price,
            });
            this.getCategories()
          });
      }
    } else {
      this.getCategories()
    }

  }

  // unsubscribe from subscriptions on destroy
  ngOnDestroy(): void {
    this.postProduct$.unsubscribe();
    this.categories$.unsubscribe();
  }

  //get all categories for dropdown
  getCategories() {
    this.categories$ = this.categoryService.getCategories().subscribe((result) =>
    {
      //filter out inactive categories
      result.forEach((category) => {
        if (category.isActive) {
          this.categories.push(category);
        }
      });
    });
  }

  // return page title
  getTitle(): string {
    if (this.isAdd) {
      return 'Add new product';
    } else {
      return 'Edit product';
    }
  }

  // creates the filepath where the image will be saved
  onImageSelected(event: any): void {
    // create a random id
    const randomId = Math.random().toString(36).substring(2);
    this.filePath += randomId;
    // create a reference to the storage bucket location
    this.ref = this.angularFireStorage.ref(this.filePath);
    this.imageFile = event.target.files[0];
    this.isImageChanged = true;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    // if no image was uploaded give an error message
    if (this.imageFile === undefined && this.isAdd) {
      this.isSubmitted = false;
      this.errorMessage = 'No image selected!';
    } else {
      // uploads image & save data
      if (this.isImageChanged) {
        this.task = this.angularFireStorage.upload(
          this.filePath,
          this.imageFile
        );
        this.task.snapshotChanges().subscribe((result) => {
          this.ref?.getDownloadURL().subscribe((url) => {
            this.productForm.patchValue({
              imageUrl: url,
            });
            if (url !== undefined) {
              this.submitData();
            }
          });
        });
        this.task
          .percentageChanges()
          .subscribe((p) => (this.uploadProgress = p));
      } else {
        this.submitData();
      }
    }
  }

  //saves the submitten object to the DB
  async submitData(): Promise<void> {
    //creates the to be submitted object
    this.createInputProduct();
    if (this.isAdd) {
      // inputvalues for DB
      this.inputProduct.rating = 0;
      this.inputProduct.color = '';
      this.inputProduct.size = '';
      this.inputProduct.amount = '';

      this.postProduct$ = this.productService
        .postProduct(this.inputProduct)
        .subscribe(
          (result) => {
            this.router.navigateByUrl('products');
          },
          (error) => {
            this.isSubmitted = false;
            this.errorMessage = error.message;
          }
        );
    } else {
      this.putProduct$ = this.productService
        .putProduct(this.inputProduct._id!, this.inputProduct)
        .subscribe(
          (result) => {
            this.router.navigateByUrl('products');
          },
          (error) => {
            this.isSubmitted = false;
            this.errorMessage = error.message;
          }
        );
    }
  }

  createInputProduct(){
    this.inputProduct.category = this.productForm.value.categoryId;
    this.inputProduct.name = this.productForm.value.name;
    this.inputProduct.description = this.productForm.value.description;
    this.inputProduct.stockCount = this.productForm.value.stockCount;
    this.inputProduct.imageLocation = this.productForm.value.imageUrl;
    this.inputProduct.price = this.productForm.value.price;
    this.inputProduct.isActive = true;
  }
}
