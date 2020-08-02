import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(public alertService: AlertsService) { }

  ngOnInit(): void {
  }

  public close(alert: any): void {
    this.alertService.alerts = this.alertService.alerts.filter((a) => a != alert);
  }

}
