import { Injectable } from '@angular/core';
import { Device } from '../models/device';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private http: HttpClient) {}

  public connect(): Observable<any> {
    return this.http.get<any>('/api/device/connect');
  }

  public getUserDevices(userId: number): Observable<Array<Device>> {
    return this.http.get<Array<Device>>(`/api/user/${userId}/devices`);
  }

  public patchDevice(devId: number, patch: any): Observable<Device> {
    return this.http.patch<Device>(`/api/device/${devId}/`, patch);
  }

  public deleteDevice(devId: number): Observable<any> {
    return this.http.delete<any>(`/api/device/${devId}/`);
  }
  
}
