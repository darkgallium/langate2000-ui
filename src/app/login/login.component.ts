import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DeviceService } from '../services/device.service';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private authService: AuthService,
    public alertService: AlertsService) {
    this.loginFormGroup = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    if (this.authService.isConnected()) {
      this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
    }
  }

  private handleError(title: string, message: string, type: string) {
    this.alertService.alerts.push({
      title,
      type,
      message
    });
  }

  public connect() {

    this.authService.login(
      this.loginFormGroup.get('username').value,
      this.loginFormGroup.get('password').value).subscribe((result) => {

        this.deviceService.connect().subscribe((ok) => {
          this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            // special code when too many devices
          } else if (err.status == 500) {
            this.handleError('Erreur interne', 'impossible de connecter cet appareil à internet.', 'danger');
          }
        });
        
      }, (err: HttpErrorResponse) => {
        if (err.error.username) {
          for (const e of err.error.username) {
            this.handleError('Nom d\'utilisateur', e, 'warning');
          }
        } 
        
        if (err.error.password) {
          for (const e of err.error.password) {
            this.handleError('Mot de passe', e, 'warning');
          }
        } 
        
        if (err.error.non_field_errors) {
          for (const e of err.error.non_field_errors) {
            this.handleError('Erreur', e, 'danger');
          }
        }
      });
  }

}
