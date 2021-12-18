import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;
  categories: Category[] = [];

  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ProductFromComponentData
  ) {}

  ngOnInit(): void {
    const { name, description, stockCount, isActive, imageLocation, category } = this.data;

    console.log(this.data)
    this.formGroup = this.formBuilder.group({
      name,
      description,
      stockCount,
      isActive,
      imageLocation,
      category,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface ProductFromComponentData {
  name: string;
  description: string;
  stockCount: number;
  isActive: boolean;
  imageLocation: string;
  category: Category;
}
