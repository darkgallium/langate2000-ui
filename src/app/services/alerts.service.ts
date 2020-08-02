import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
    

  public alerts: Array<any>;

  constructor() {
    this.alerts = [];
  }

}