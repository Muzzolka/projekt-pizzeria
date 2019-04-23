import { select, classNames, templates, settings } from '../settings.js';
import { utils } from '../utils.js';
import { CartProduct } from './CartProduct.js';

export class Cart {
  constructor(element) {
    //console.log(element);
    this.products = [];
    this.deliveryFree = parseInt(document.querySelector(select.cart.deliveryFee).innerText);

    this.getElements(element);

    this.initActions();

    //console.log('new Cart', this);
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
    this.update();
  }

  getElements(element) {

    this.dom = {};

    this.dom.wrapper = element;
    //console.log(this.dom.wrapper);
    this.dom.toggleTrigger = this.dom.wrapper.querySelector(select.cart.toggleTrigger);
    this.dom.productList = this.dom.wrapper.querySelector(select.cart.productList);
    this.renderTotalKeys = ['totalNumber', 'totalPrice', 'subtotalPrice', 'deliveryFree'];
    for (let key of this.renderTotalKeys){
      this.dom[key] = this.dom.wrapper.querySelectorAll(select.cart[key]);
    }

    this.dom.form = this.dom.wrapper.querySelector(select.cart.form);
    this.dom.phone = this.dom.wrapper.querySelector(select.cart.phone);
    this.dom.address = this.dom.wrapper.querySelector(select.cart.address);
  }

  remove(cartProduct) {
    const thisCart = this;
    const index = thisCart.products.indexOf(cartProduct);
    thisCart.products.splice(index);
    var elem = cartProduct.dom.wrapper;
    elem.parentNode.removeChild(elem);
    thisCart.update();
  }

  initActions() {
    const thisCart = this;
    //console.log('tutaj :', this.dom.wrapper);
    thisCart.dom.toggleTrigger.addEventListener('click', function() {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function() {
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function(event) {
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function(event) {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }

  update() {
    const thisCart = this;
    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;
    for (let product of this.products) {
      thisCart.subtotalPrice += product.price;
      thisCart.totalNumber += product.amount;
    }
    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFree;
    console.log(thisCart.totalPrice);
    console.log(thisCart.subtotalPrice);
    console.log(thisCart.totalNumber);
    console.log(thisCart.deliveryFree);

    for (let key of thisCart.renderTotalKeys) {
      for (let elem of thisCart.dom[key]) {
        elem.innerHTML = thisCart[key];
      }
    }
  }

  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.order;

    const payload = {
      address: thisCart.dom.address.innerHTML,
      totalNumber: thisCart.totalNumber,
      subtotalPrice: thisCart.subtotalPrice,
      deliveryFree: thisCart.deliveryFree,
      totalPrice: thisCart.totalPrice,
      products: {},
    };

    for (let product in thisCart.products) {
      payload.products.push(product.getData());
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function(response) {
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
}