import { Injectable } from '@angular/core';
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string,
    eventValue: number) {
    var data = {
      EVENT_NAME: eventName,
      EVENT_CATEGORY: eventCategory,
      EVENT_ACTION: eventAction,
      EVENT_LABEL: eventLabel,
      EVENT_VALUE: eventValue
    }
    console.log("GOOGLE EVENT", data);
    gtag('event', eventName, {
      event_category: eventCategory,
      event_label: eventLabel,
      event_action: eventAction,
      event_value: eventValue
    })
  }
}
