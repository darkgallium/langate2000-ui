import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { User } from '../models/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username: string;
  public numberDevices: Number;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((user) => {
      this.username = user.username;
      this.numberDevices = user.profile.max_device_nb;
    });
  }

}
