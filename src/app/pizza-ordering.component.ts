import { Component } from '@angular/core';

@Component({
  selector: 'app-pizza-ordering',
  templateUrl: './pizza-ordering.component.html',
  styleUrls: ['./pizza-ordering.component.css']
})
export class PizzaOrderingComponent {
  public readonly pizzaSizes = {
    'Small': 5,
    'Medium': 7,
    'Large': 8,
    'Extra Large': 9
  };

  public readonly toppings = {
    'Tomatoes': '1.00',
    'Onions': '0.50',
    'Bell pepper': '1.00',
    'Mushrooms': '1.20',
    'Pineapple': '0.75',
    'Sausage': '1.00',
    'Pepperoni': '2.00',
    'Barbecue chicken': '3.00'
  };

  constructor() {}

  public getSizeTitle(sizeLabel: string): string {
    if (this.pizzaSizes[sizeLabel]) {
      return `${sizeLabel} ($${this.pizzaSizes[sizeLabel]})`;
    }

    return sizeLabel;
  }

  public getToppingTitle(toppingLabel: string): string {
    if (this.toppings[toppingLabel]) {
      return `${toppingLabel} ($${this.toppings[toppingLabel]})`;
    }

    return toppingLabel;
  }

   public get toppingNams(): string[] {
    return Object.keys(this.toppings);
   }

   public onClickCell(e) {
     debugger;
     alert('sdfsdf');
    let target = e.currentTarget;
   }

   public get selected(): Array<boolean[]> {
     let result = [];

     for (let i = 0; i <= 7; i++) {
      let arr = Array(4);
      arr.fill(false);
      result.push(arr);
     }

     return result;
   }
}