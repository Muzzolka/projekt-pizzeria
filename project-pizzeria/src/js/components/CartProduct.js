import { select } from '../settings.js';

export class CartProduct {
  constructor(menuProduct, element) {
    this.id = menuProduct.id;
    this.name = menuProduct.name;
    this.id = menuProduct.price;
    this.name = menuProduct.priceSingle;
    this.id = menuProduct.amount;
    this.id = menuProduct.params = JSON.parse(JSON.stringify(menuProduct.params));
    this.getElements(element);
    console.log(this);
  }

  getElements(element) {
    this.dom = {};
    this.dom.wrapper = element;
    this.dom.amountWidget = this.dom.wrapper.querySelector(select.cartProduct.amountWidget);
    this.dom.price = this.dom.wrapper.querySelector(select.cartProduct.price);
    this.dom.edit = this.dom.wrapper.querySelector(select.cartProduct.edit);
    this.dom.remove = this.dom.wrapper.querySelector(select.cartProduct.remove);
  }
}