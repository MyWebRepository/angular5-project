import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public foods: any[] = [{
    food: 'Burger',
    price: '$20'
  }];
  
  constructor() {}
}
