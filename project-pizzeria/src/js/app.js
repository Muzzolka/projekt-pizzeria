/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

import { Booking } from './components/Booking.js';
import { Cart } from './components/Cart.js';
import { classNames, select, settings } from './settings.js';
import { Product } from './components/Product.js';

const app = {

  initMenu: function(){
    const thisApp = this;
    //console.log('thisApp.data', thisApp.data);
    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    //we will use soon: thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function(rawResponse) {
        return rawResponse.json();
      })
      .then(function(parsedResponse) {
        thisApp.data.products = parsedResponse;
        thisApp.initMenu();
      });

  },

  init: function(){
    const thisApp = this;
    //console.log('*** App starting ***');
    //console.log('thisApp:', thisApp);
    //console.log('classNames:', classNames);
    //console.log('settings:', settings);
    //console.log('templates:', templates);
    thisApp.initPages();
    thisApp.initData();
    this.initCart();
    this.initBooking();
  },

  initCart: function() {
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    this.cart = new Cart(cartElem);
    thisApp.productList = document.querySelector(select.containerOf.menu);
    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },
  /* czemu przekazujemy pageId skoro potem to łaczymy z haszem */
  activatePage: function (pageId) {
    const thisApp = this;
    for(let link of thisApp.navLinks){
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);
    }

    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* co to jest? */
    window.location.hash = '#/' + pageId;
  },

  initPages: function () {
    const thisApp = this;
    thisApp.pages = Array.from(document.querySelector(select.containerOf.pages).children);
    thisApp.navLinks = Array.from(document.querySelectorAll(select.nav.links));
    let pagesMatchingHash = [];
    if (window.location.hash.length > 2) {
      const idFromHash = window.location.hash.replace('#/', '');

      pagesMatchingHash = thisApp.pages.filter(function(page){
        return page.id == idFromHash;
      });
    }

    thisApp.activatePage(pagesMatchingHash.length ? pagesMatchingHash[0].id : thisApp.pages[0].id);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function(event) {
        const clickedElement = this;
        event.preventDefault();
        /* get page id from href */
        const pageId = clickedElement.getAttribute('href').replace('#', '');
        /* activate page */
        thisApp.activatePage(pageId);
      });
    }
  },

  initBooking: function () {
    const bookingWidgetContainer = document.querySelector(select.containerOf.booking);
    this.bookingObject = new Booking(bookingWidgetContainer);
  }
};

app.init();
