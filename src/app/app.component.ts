import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'langate2000-ui';

  constructor(public auth: AuthService, private router: Router) {
  }

  disconnect() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
