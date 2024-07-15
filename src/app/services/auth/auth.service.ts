import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/classes/user/user';
import { map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DataService {
  constructor(http: HttpClient, private router: Router) {
    super(environment.baseUrl + '/auth', http);
  }

  registerUser(payload: User) {
    return this.create(payload, '/register');
  }

  loginUser(payload: User) {
    return this.create(payload, '/login').pipe(
      map((response: any) => {
        if (response && response.accessToken && response.roles) {
          const token = response.accessToken;
          const roles = response.roles;
          localStorage.setItem('token', token);
          localStorage.setItem('roles', JSON.stringify(roles));
          return response;
        }
      })
    );
  }

  logoutUser() {
    this.getData('/logout').subscribe((response) => {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    });
  }

  isLoggedIn() {
    // import jwtDecode from 'jwt-decode';

    let token = localStorage.getItem('token');
    // console.log('token: ', token);
    if (token) {
      let decoded: any = jwtDecode(JSON.stringify(token));
      // console.log('decoded: ', decoded);
      const userInfo = decoded.userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      let givenTimeInSeconds = decoded.exp;
      // Get the current time in seconds since the Unix epoch
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      let isExpired = givenTimeInSeconds
        ? givenTimeInSeconds < currentTimeInSeconds
        : null;
      return !isExpired;
    }
    return false;
  }

  getAccessToken() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    return token;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return;

    let decoded: any = jwtDecode(JSON.stringify(token));
    let user = decoded.userInfo;
    return user;
  }

  get userRoles() {
    let token = localStorage.getItem('token');
    if (!token) return;

    let decoded: any = jwtDecode(JSON.stringify(token));
    let user = decoded.userInfo;
    return user.roles;
  }

  isUserEditor(role: number) {
    let token = localStorage.getItem('token');
    if (!token) return;

    let decoded: any = jwtDecode(JSON.stringify(token));
    let user = decoded.userInfo;
    let isEditor: boolean = user.roles.includes(role);
    return isEditor;
  }

  refreshToken() {
    return this.getData('/refresh-token');
  }
}
