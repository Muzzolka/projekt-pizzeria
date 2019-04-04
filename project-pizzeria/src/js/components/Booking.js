import { select, templates } from '../settings.js';
import { AmountWidget } from './AmountWidget.js';

export class Booking {
  constructor(widget) {
    this.render(widget);
    this.initWidgets();
  }

  render(widget) {
    const generatedHTML = templates.bookingWidget();

    this.dom = {};
    this.dom.wrapper = widget;

    this.dom.wrapper.innerHTML = generatedHTML;
    this.dom.peopleAmount = this.dom.wrapper.querySelector(select.booking.peopleAmount);
    this.dom.hoursAmount = this.dom.wrapper.querySelector(select.booking.hoursAmount);
  }

  initWidgets() {
    this.peopleAmount = new AmountWidget(this.dom.peopleAmount);
    this.hoursAmount = new AmountWidget(this.dom.hoursAmount);
  }
}