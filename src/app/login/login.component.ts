import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DeviceService } from '../services/device.service';

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
    private authService: AuthService) {
    this.loginFormGroup = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  public connect() {

    this.authService.login(
      this.loginFormGroup.get('username').value,
      this.loginFormGroup.get('password').value).subscribe((result) => {
        this.deviceService.connect().subscribe((ok) => console.log(ok), (err)=> console.log(err));
        //this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/'])
      });
  }

}
