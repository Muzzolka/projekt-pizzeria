import { select, templates } from '../settings.js';
import { utils } from '../utils.js';
import { AmountWidget } from './AmountWidget';

export class Booking {
  constructor(widget) {
    this.render(widget);
    this.initWidgets();
  }

  render(widget) {
    const generatedHTML = templates.bookingWidget();

    this.dom = {};
    this.dom.wrapper = widget;

    const generatedDOM = utils.createDOMFromHTML(this.dom.wrapper);
    this.dom.peopleAmount = this.dom.wrapper.querySelector(select.booking.peopleAmount);
    this.dom.hoursAmount = this.dom.wrapper.querySelector(select.booking.hoursAmount);
  }

  initWidgets() {
    this.peopleAmount = new AmountWidget(this.dom.peopleAmount);
    this.hoursAmount = new AmountWidget(this.dom.hoursAmount);
  }
}