import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-ordering',
  templateUrl: './pizza-ordering.component.html',
  styleUrls: ['./pizza-ordering.component.css']
})
export class PizzaOrderingComponent implements OnInit {
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

  private selected = [];
  private results = [];

  constructor() {}

  ngOnInit(): void {
    this.selected = this.getSelected();
  }

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

  public onClickCell(row: number, col: number): void {
    this.selected[row][col] = !this.selected[row][col];
    this.calculate();
  }

  public getSelected(): Array<boolean[]> {
    let result = [];

    for (let i = 0; i <= 7; i++) {
      let arr = Array(4);
      arr.fill(false);
      result.push(arr);
    }

    return result;
  }

  public isShown(row: number, col: number): boolean {
    return this.selected[row][col];
  }

  public getResult(index: number): any {
    return this.results[index];
  }

  private calculate(): void {
    this.results = [];

    for (let i = 0; i <= 3; i++) { 
      if (i == 0 || i == 3) { // For small and extra large
        let offer: string = '';
        let total: number = 0 

        for (let j = 0; j <=  7; j++) {
          if (this.selected[j][i]) {
            if (total == 0) {
              total = Object.values(this.pizzaSizes)[i] + Number(Object.values(this.toppings)[j]);
            } else {
              total += Number(Object.values(this.toppings)[j]); 
            }
          }
        }

        this.results.push({offer, total});
      }

      if (i == 1) { // For Medium
        let offer: string = '';
        let total: number = 0 
        let count: number = 0;

        for (let j = 0; j <=  7; j++) {
          if (this.selected[j][i]) {
            if (total == 0) {
              total += Object.values(this.pizzaSizes)[i] + Number(Object.values(this.toppings)[j]);
            } else {
              total += Number(Object.values(this.toppings)[j]); 
            }
            count++;
          }
        }

        this.results.push(count == 2 ? {offer: 'offer 1', total: 5, originalTotal: total} : {offer: '', total});
      }

      if (i == 2) { // For large
        let offer: string = '';
        let total: number = 0 
        let count: number = 0;

        for (let j = 0; j <=  7; j++) {
          if (this.selected[j][i]) {
            if (total == 0) {
              total += Object.values(this.pizzaSizes)[i] + Number(Object.values(this.toppings)[j]);
            } else {
              total += Number(Object.values(this.toppings)[j]); 
            }
            count++;
          }
        }

        if (this.selected[6][2]) { // Pepperoni is selected
          count++;
        }

        if (this.selected[7][2]) { // Barbecue chicken is selected
          count++;
        }

        this.results.push(count == 4 ? {offer: 'offer 3', total: total / 2.0, originalTotal: total} : {offer: '', total});
      }
    }
  }
}