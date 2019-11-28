import { Component, OnInit, HostListener } from "@angular/core";
import { ProductItem } from "src/app/entities/product-item";
import { BodyService } from "src/app/services/body-service.service";

@Component({
  selector: "app-shopping-page",
  templateUrl: "./shopping-page.component.html",
  styleUrls: ["./shopping-page.component.css"]
})
export class ShoppingPageComponent implements OnInit {
  products: ProductItem[] = [];
  quantities: number[] = [];
  shownProducts: ProductItem[] = [];

  filteredNameProducts: ProductItem[] = [];
  filteredPriceProducts: ProductItem[] = [];

  public innerWidth: any;

  constructor(private body: BodyService) {}

  ngOnInit() {
    this.body.currentProducts.subscribe(products => (this.products = products));
    this.body.currentQuantities.subscribe(
      quantities => (this.quantities = quantities)
    );
    this.shownProducts = this.products;
    this.filteredNameProducts = this.products;
    this.filteredPriceProducts = this.products;
    this.innerWidth = window.innerWidth;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  prodFilterName = filterText => {
    this.filteredNameProducts = this.products.filter(item => {
      return item.name.toLowerCase().includes(filterText.toLowerCase());
    });
    this.makeShownProducts();
  };

  prodFilterPrice = filterPrice => {
    if (filterPrice.length == 0) {
      this.filteredPriceProducts = this.products;
      this.makeShownProducts();
      return;
    }
    this.filteredPriceProducts = this.products.filter(item => {
      return item.price <= filterPrice;
    });
    this.makeShownProducts();
  };

  makeShownProducts = () => {
    this.shownProducts = this.filteredNameProducts.filter(
      value => -1 !== this.filteredPriceProducts.indexOf(value)
    );
  };

  add = id => {
    this.body.increaseQuantity(id);
  };

  decrease = id => {
    this.body.decreaseQuantity(id);
  };
}
