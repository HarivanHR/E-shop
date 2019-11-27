import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingPageComponent } from "./components/page/shopping-page/shopping-page.component";
import { CartComponent } from "./components/page/cart/cart.component";

const routes: Routes = [
  {
    path: "",
    component: ShoppingPageComponent
  },
  {
    path: "shop",
    component: ShoppingPageComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
