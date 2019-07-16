import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PizzaOrderingComponent } from './pizza-ordering.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaOrderingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
