import { Component, OnInit } from '@angular/core';

const sizes = 4;
const numToppings = 8;

@Component({
  selector: 'app-pizza-ordering',
  templateUrl: './pizza-ordering.component.html',
  styleUrls: ['./pizza-ordering.component.css']
})
export class PizzaOrderingComponent implements OnInit {
  // Define pizza sizes and corresponding prices. 
  public readonly pizzaSizes = {
    'Small': 5,
    'Medium': 7,
    'Large': 8,
    'Extra Large': 9
  };

  // Define pizza toppings and corresponding prices
  // To keep double decimals, prices use string instead 
  // of number. And will be converted to number in calculation.
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

  private selected = []; // Keeps tracking of selected size and toppings.
  private results = []; // Stores calculated results including totals and offers.

  constructor() {}

  ngOnInit(): void {
    this.selected = this.getSelected(); // Initialize.
  }

  /**
   * Creates Pizza size labels.
   * @param sizeLabel
   */
  public getSizeTitle(sizeLabel: string): string {
    if (this.pizzaSizes[sizeLabel]) {
      return `${sizeLabel} ($${this.pizzaSizes[sizeLabel]})`;
    }

    return sizeLabel;
  }

  /**
   * Creates topping labels.
   * @param toppingLabel 
   */
  public getToppingTitle(toppingLabel: string): string {
    if (this.toppings[toppingLabel]) {
      return `${toppingLabel} ($${this.toppings[toppingLabel]})`;
    }

    return toppingLabel;
  }

  /**
   * Returns an array of topping names.
   */
  public get toppingNams(): string[] {
    return Object.keys(this.toppings);
  }

  /**
   * When clicking a table cell, toggles selection and performs
   * calculation
   * @param row 
   * @param col 
   */
  public onClickCell(row: number, col: number): void {
    this.selected[row][col] = !this.selected[row][col];
    this.calculate();
  }

  /**
   * Creates inital table cell tracking array.
   */
  public getSelected(): Array<boolean[]> {
    let result = [];

    for (let i = 0; i <= 7; i++) {
      let arr = Array(4);
      arr.fill(false);
      result.push(arr);
    }

    return result;
  }

  /**
   * If a table cell is seletecd, return true, otherwise return false.
   * @param row 
   * @param col 
   */
  public isShown(row: number, col: number): boolean {
    return this.selected[row][col];
  }

  /**
   * Returns calculated result corresponding to a pizza size.
   * @param index 
   */
  public getResult(index: number): any {
    return this.results[index];
  }

  /**
   * If offer's criterion is satisfied, returns true, otherwise returns false.
   * @param index 
   */
  public showOffer(index: number): boolean {
    return this.getResult(index) && this.getResult(index).offer != '';
  }

  /**
   * If total's criterion is satisfied, returns true, otherwise returns false.
   * @param index 
   */
  public showTotal(index: number): boolean {
    return this.getResult(index) && this.getResult(index).total > 0;
  }

  /**
   * Calculates results for all pizza sizes.
   */
  private calculate(): void {
    this.results = [];

    for (let i = 0; i < sizes; i++) { 
      if (i == 0 || i == 3) { // For small and extra large
        let offer: string = '';
        let total: number = 0 

        for (let j = 0; j < numToppings; j++) {
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

        for (let j = 0; j < numToppings; j++) {
          if (this.selected[j][i]) {
            if (total == 0) {
              total += Object.values(this.pizzaSizes)[i] + Number(Object.values(this.toppings)[j]);
            } else {
              total += Number(Object.values(this.toppings)[j]); 
            }
            count++;
          }
        }

        this.results.push(count == 2 ? {offer: 'Offer 1', total: 5, originalTotal: total} : {offer: '', total});
      }

      if (i == 2) { // For large
        let offer: string = '';
        let total: number = 0 
        let count: number = 0;

        for (let j = 0; j < numToppings; j++) {
          if (this.selected[j][i]) {
            if (total == 0) {
              total += Object.values(this.pizzaSizes)[i] + Number(Object.values(this.toppings)[j]);
            } else {
              total += Number(Object.values(this.toppings)[j]); 
            }
            count++;
          }
        }

        let pepperoniIndex = this.getIndex('Pepperoni');
        if (this.selected[pepperoniIndex][i]) { // Pepperoni is selected
          count++;
        }

        let BarbecueChickenIndex = this.getIndex('Barbecue chicken');
        if (this.selected[BarbecueChickenIndex][i]) { // Barbecue chicken is selected
          count++;
        }

        this.results.push(count == 4 ? {offer: 'Offer 3', total: total / 2.0, originalTotal: total} : {offer: '', total});
      }
    }
  }

  /**
   * Returns a topping's index in object keys.
   * @param toppingName 
   */
  private getIndex(toppingName: string): number {
    return Object.keys(this.toppings).findIndex(item => item == toppingName);
  }
}