import { Component, OnInit, Input, HostListener } from "@angular/core";
import { BodyService } from "src/app/services/body-service.service";
import { ProductItem } from "src/app/entities/product-item";
import {
  IPayPalConfig,
  ICreateOrderRequest,
  ITransactionItem
} from "ngx-paypal";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  products: ProductItem[];
  quantities: number[];
  total: number;
  public innerWidth: any;
  public payPalConfig?: IPayPalConfig;

  constructor(private body: BodyService) {}

  ngOnInit() {
    this.body.currentProducts.subscribe(products => (this.products = products));
    this.body.currentQuantities.subscribe(
      quantities => (this.quantities = quantities)
    );
    this.total = this.getTotalPrice();
    this.initConfig();
    this.innerWidth = window.innerWidth;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: "USD",
      clientId:
        "AeA__AAG4CfneQK5g0W6Ga3ib6_pGvNyK2BukO3TelVeqW0yb00nZXOhd7B8fqQu-VNfVqmik5VYIGG_",
      createOrderOnClient: data =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: this.total.toString(),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: this.total.toString()
                  }
                }
              },
              items: this.getPaypalItems()
            }
          ]
        },
      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: data => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
        this.body.registerOrder(data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
        // this.showCancel = true;
      },
      onError: err => {
        console.log("OnError", err);
        //this.showError = true;
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
        // this.resetStatus();
      }
    };
  }

  getTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < this.products.length; i++) {
      total += this.quantities[i] * this.products[i].price;
    }
    return total;
  };

  removeFromCart = id => {
    this.body.removeFromCart(id);
    this.total = this.getTotalPrice();
  };

  getPaypalItems = (): ITransactionItem[] =>
    this.products
      .map(product => {
        return {
          name: product.name,
          quantity: this.quantities[product.id - 1].toString(),
          unit_amount: {
            currency_code: "USD",
            value: product.price.toString()
          }
        };
      })
      .filter(item => Number(item.quantity) > 0);

  isCartEmpty = () => {
    return this.quantities.reduce((a, b) => a + b, 0) == 0;
  };
}
