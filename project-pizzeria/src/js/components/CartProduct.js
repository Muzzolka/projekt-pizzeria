import { select } from '../settings.js';
import { AmountWidget } from './AmountWidget.js';

export class CartProduct {
  constructor(menuProduct, element) {
    this.id = menuProduct.id;
    this.name = menuProduct.name;
    this.price = menuProduct.price;
    this.priceSingle = menuProduct.priceSingle;
    this.amount = menuProduct.amount;
    this.params = JSON.parse(JSON.stringify(menuProduct.params));
    this.getElements(element);
    this.initAmountWidget();
    this.initActions();
  }

  getData() {
    return {
      id: this.id,
      amount: this.amount,
      price: this.price,
      proceSingle: this.priceSingle,
    };
  }

  getElements(element) {
    this.dom = {};
    this.dom.wrapper = element;
    this.dom.amountWidget = this.dom.wrapper.querySelector(select.cartProduct.amountWidget);
    this.dom.price = this.dom.wrapper.querySelector(select.cartProduct.price);
    this.dom.edit = this.dom.wrapper.querySelector(select.cartProduct.edit);
    this.dom.remove = this.dom.wrapper.querySelector(select.cartProduct.remove);
  }

  initAmountWidget() {
    const thisCartProduct = this;
    thisCartProduct.amountWidget = new AmountWidget(this.dom.amountWidget);
    this.dom.amountWidget.addEventListener('updated', function() {
      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.price = thisCartProduct.amount * thisCartProduct.priceSingle;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    });
  }

  initActions() {
    const thisCartProduct = this;
    thisCartProduct.dom.edit.addEventListener('click', function(event) {
      event.preventDefault();
    });
    thisCartProduct.dom.remove.addEventListener('click', function(event) {
      event.preventDefault();
      thisCartProduct.remove();
    });
  }

  remove() {
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }
}