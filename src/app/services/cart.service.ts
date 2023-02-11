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
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem
          break
        }
      }
    }

    //check if the item is found

    alreadyExistsInCart = existingCartItem != undefined
  }
}
