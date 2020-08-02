import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User = null;

  constructor(private http: HttpClient) {
    this.user = null;
  }


  login(username, password) {
    return this.http.post<any>(`/api/auth/login/`, { username, password })
        .pipe(map((data: {key: string}) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', data.key);
            return data;
        }));
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }

  public isConnected(): boolean {
    return this.user != null;
  }

  public isAdmin(): boolean {
    return this.user != null && (this.user.is_staff || this.user.is_superuser);
  }

  public getCurrentUser(): Observable<User> {
    if (this.user) {
      return of(this.user);
    } else {
      return this.http.get('/api/auth/user/').pipe(map((e: User) => this.user = e));
    }
  }
}
