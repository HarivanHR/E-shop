import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  quantityDatabase,
  productsDatabase,
  orderDatabase
} from "../../assets/database";

@Injectable({
  providedIn: "root"
})
export class BodyService {
  products = this.getProducts();
  private initialProducts = new BehaviorSubject([]);
  currentProducts = this.initialProducts.asObservable();
  quantities = this.getQuantities();
  private initialQuantities = new BehaviorSubject([]);
  currentQuantities = this.initialQuantities.asObservable();

  constructor() {}

  increaseQuantity(id: number) {
    if (this.initialProducts.value[id].amountAvailable == 0) {
      return;
    }
    quantityDatabase[id] += 1;
    productsDatabase[id].amountAvailable -= 1;
    if (this.initialProducts.value[id].amountAvailable == 0) {
      let addElement = document.querySelector("#addBtn" + id);
      addElement.classList.add("disabled");
    }
    let removeElement = document.querySelector("#removeBtn" + id);
    removeElement.classList.remove("disabled");
  }

  decreaseQuantity(id: number) {
    if (this.initialQuantities.value[id] == 0) {
      return;
    }
    quantityDatabase[id] -= 1;
    productsDatabase[id].amountAvailable += 1;
    if (this.initialQuantities.value[id] == 0) {
      let removeElement = document.querySelector("#removeBtn" + id);
      removeElement.classList.add("disabled");
    }
    let addElement = document.querySelector("#addBtn" + id);
    addElement.classList.remove("disabled");
  }

  removeFromCart(id: number) {
    const amountRemoved = this.initialQuantities.value[id];
    quantityDatabase[id] = 0;
    productsDatabase[id].amountAvailable += amountRemoved;
  }
  getProductsDatabase() {
    //return productsDatabase;
    return new Promise((resolve, reject) => {
      return resolve(productsDatabase);
    });
  }

  getProducts() {
    return this.getProductsDatabase().then((products: any[]) =>
      this.initialProducts.next(products)
    );
  }

  getQuantityDatabase() {
    //return productsDatabase;
    return new Promise((resolve, reject) => {
      return resolve(quantityDatabase);
    });
  }

  getQuantities() {
    return this.getQuantityDatabase().then((quantities: any[]) =>
      this.initialQuantities.next(quantities)
    );
  }

  registerOrder = data => {
    let order = {
      payer: data.payer,
      orderId: data.id,
      items: data.purchase_units[0].items
    };
    orderDatabase.push(order);
    console.log(orderDatabase);
  };
}
