import { select, classNames, templates } from '../settings.js';
import { utils } from '../utils.js';
import { CartProduct } from './CartProduct.js';

export class Cart {
  constructor(element) {
    console.log(element);
    this.products = [];

    this.getElements(element);

    this.initActions();

    console.log('new Cart', this);
  }

  add(menuProduct) {

    /* generate HTML */
    const generatedHTML = templates.cartProduct(menuProduct);
    /* create element utils.createElementFromHTML */
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    /* find menu container */
    this.dom.productList.appendChild(generatedDOM);
    const newProduct = new CartProduct(menuProduct, generatedDOM);
    this.products.push(newProduct);
  }

  getElements(element) {

    this.dom = {};

    this.dom.wrapper = element;
    console.log(this.dom.wrapper);
    this.dom.toggleTrigger = this.dom.wrapper.querySelector(select.cart.toggleTrigger);
    this.dom.productList = this.dom.wrapper.querySelector(select.cart.productList);
  }

  initActions() {
    const thisCart = this;
    console.log('tutaj :', this.dom.wrapper);
    thisCart.dom.toggleTrigger.addEventListener('click', function() {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
  }
}