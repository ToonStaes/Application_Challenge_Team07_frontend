import { Component, OnInit } from '@angular/core';


import { Product } from '../admin/product/product';

import { Order } from '../order';
import { OrderService } from '../order.service';
import { User } from '../user';
import { UserService } from '../user.service';

import { Category } from '../admin/category/category';
import { CategoryService } from '../admin/category/category.service';
import { ProductService } from '../admin/product/product.service';
import { Basket } from '../user/basket/basket';
import { BasketService } from '../user/basket/basket.service';
import { BasketItem } from '../user/basket/basketItem';
import { BasketItemService } from '../user/basket/basket-item.service';

@Component({
  selector: 'app-api-tests',
  templateUrl: './api-tests.component.html',
  styleUrls: ['./api-tests.component.scss']
})
export class ApiTestsComponent implements OnInit {

  date: Date = new Date();

  products: Product[] = [];
  product: Product = {
    _id: '0',
    name: "Test Product",
    price: 0.00,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    isActive: true,
    stockCount: 0,
    rating: 5,
    imageLocation: "string",
    expirationDate: "date",
    color: "string",
    size: "string",
    amount: '0',
    categoryId: '61b6fd619d7d2a27b9880374',
    category: {} as Category
  };

  baskets: Basket[] = [];
  userBaskets: Basket[] = [];
  basket: Basket = {} as Basket;

  categories: Category[] = [];
  category: Category = {} as Category;

  orders: Order[] = [];
  order: Order = {} as Order;

  users: User[] = [];
  user: User = {} as User;

  basketItems: BasketItem[] = [];
  basketBasketItems: BasketItem[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private basketService: BasketService,
    private orderService: OrderService,
    private userService: UserService,
    private basketItemService: BasketItemService
    ) { }

  ngOnInit(): void {
    // testing major get calls
    // foreign ID's are supposed to be blank in this case
    this.productService.getProducts().subscribe((result) => (this.products = result));
    this.productService.getProductById('61b852ad4cfca36337954269').subscribe((result) => (this.product = result));

    this.basketService.getBaskets().subscribe((result) => (this.baskets = result));
    this.basketService.getBasketById("61b8956b0f13f428aa15553c").subscribe((result) => (this.basket = result));
    this.basketService.getBasketsByUserId("61b70536efeb9804e3a76664").subscribe((result) => (this.userBaskets = result));


    this.categoryService.getCategories().subscribe((result) => (this.categories = result));
    this.categoryService.getCategoryById("61b6fd619d7d2a27b9880374").subscribe((result) => (this.category = result));

    this.orderService.getOrders().subscribe((result) => (this.orders = result));
    this.orderService.getOrderById("61b9f575a87bda6bef8f0fb4").subscribe((result) => (this.order = result));

    this.userService.getUsers().subscribe((result) => (this.users = result));
    this.userService.getUserById("61b70536efeb9804e3a76664").subscribe((result) => (this.user = result));

    this.basketItemService.getBasketItems().subscribe((result) => (this.basketItems = result));
    this.basketItemService.getBasketItemsByBasketId("61b894ba6b3e71fd79dff753").subscribe((result) => (this.basketBasketItems = result));
  }

}
