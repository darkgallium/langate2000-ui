import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { User } from '../models/user';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/device';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: User;
  public username: string;
  public numberDevices: Number;
  public devices: Array<Device>;
  public displayedColumns: string[] = [ 'fake_id', 'name', 'area', 'actions'];
  public modifyDeviceNameForm: FormGroup;

  public modifyDeviceId: number;
  public deleteDeviceId: number;

  constructor(private auth: AuthService,
    private router: Router,
    private deviceService: DeviceService,
    private modalService: NgbModal,
    private fb: FormBuilder) {
    this.devices = [];
    this.modifyDeviceNameForm = this.fb.group({
      newDeviceName: ['']
    });
  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.username = user.username;
      this.numberDevices = user.profile.max_device_nb;
      this.updateDeviceTable();
    });

  }

  public updateDeviceTable() {
    this.deviceService.getUserDevices(this.user.id).subscribe((devs) =>  {
      this.devices = devs.map((d) => ({fake_id: devs.indexOf(d)+1, ...d}));

      if (this.devices.length === 0) {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  public openModifyDeviceNameModal(modal: any, id: number) {
    this.modifyDeviceId = id;
    this.modalService.open(modal, {centered: true});
  }

  public modifyDeviceName(modal: any) {
    this.deviceService.patchDevice(this.modifyDeviceId, {name: this.modifyDeviceNameForm.get('newDeviceName').value}).subscribe((result) => {
      this.updateDeviceTable();
      modal.close();
    });
  }

  public openDeleteDeviceModal(modal: any, id: number) {
    this.deleteDeviceId = id;
    this.modalService.open(modal, {centered: true});
  }

  public deleteDevice(modal: any) {
    this.deviceService.deleteDevice(this.deleteDeviceId).subscribe((result) => {
      this.updateDeviceTable();
      modal.close();
    });
  }


}
