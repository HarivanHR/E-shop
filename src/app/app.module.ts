import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxPayPalModule } from "ngx-paypal";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/shared/header/header.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { ShoppingPageComponent } from "./components/page/shopping-page/shopping-page.component";
import { CartComponent } from "./components/page/cart/cart.component";
import { PageComponent } from "./components/page/page.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ShoppingPageComponent,
    CartComponent,
    PageComponent
  ],
  imports: [NgxPayPalModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
