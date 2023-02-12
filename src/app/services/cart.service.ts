import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { CartItem } from '../common/cart-item'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = []

  totalPrice: Subject<number> = new Subject<number>()

  totalQuantity: Subject<number> = new Subject<number>()

  constructor() {}

  addToCart(theCartItem: CartItem) {
    //check if the item already exists in cart
    let alreadyExistsInCart: boolean = false

    let existingCartItem: CartItem | undefined = undefined

    if (this.cartItems.length > 0) {
      //find the item in the cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      //check if the item is found
      alreadyExistsInCart = existingCartItem != undefined
    }

    if (!alreadyExistsInCart) {
      //just add item to array
      this.cartItems.push(theCartItem)
    } else {
      if (existingCartItem)
        //increase the quantity
        existingCartItem.quantity++
    }

    //compute cart total price and total quantity
    this.computeCartTotals()
  }
  computeCartTotals() {
    let totalPriceValue: number = 0
    let totalQuantityValue = 0

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice
      totalQuantityValue += currentCartItem.quantity
    }
    //publish the new values. all subscribers will receive new data
    this.totalPrice.next(totalPriceValue)
    this.totalQuantity.next(totalQuantityValue)
  }
}
