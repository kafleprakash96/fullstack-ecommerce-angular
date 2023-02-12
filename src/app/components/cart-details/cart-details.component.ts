import { Component } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {

  cartItems : CartItem[] = [];

  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService:CartService){

  }

  ngOnInit() : void {
    this.listCartDetails();
  }
  listCartDetails() {
      // get handle to the cart items
      this.cartItems = this.cartService.cartItems;

      //subscribe to totalPrice and totalQuantity
      this.cartService.totalPrice.subscribe(
        data => this.totalPrice = data
      )

      this.cartService.totalQuantity.subscribe(
        data => this.totalQuantity = data
      )

      //compute totalprice and quantity
      this.cartService.computeCartTotals();
  }

}
