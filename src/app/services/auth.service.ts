import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthModel } from '../interfaces/auth.model';
import { LOGIN_TABLE, USERS_TABLE } from './constants';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isLogin:boolean = false;
  
  private authSubject = new Subject<boolean>();

  constructor(private router: Router) { 
    this.isLogin = this.isLoggedIn();
  }

  signup(employeeId:number, password:string, confirmPassword: string) {
    if(password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    const allUsers = localStorage.getItem(USERS_TABLE);
    const allUsersData:AuthModel[] = allUsers ? JSON.parse(allUsers) : [];
    const signupData:AuthModel = {
      employeeId,
      password
    }

    if(!allUsersData.find(user => user.employeeId === employeeId)) {
      allUsersData.push(signupData);
      localStorage.setItem(USERS_TABLE, JSON.stringify(allUsersData));
      this.login(employeeId, password);
    } else {
      console.log('User already exist');
    }
  }

  login(employeeId:number, password:string):void {
    const loginData = {
      employeeId,
    }

    sessionStorage.setItem(LOGIN_TABLE, JSON.stringify(loginData));
    this.router.navigate(['/']);
    this.authSubject.next(true);
    this.isLogin = true;
  }

  logout():void {
    sessionStorage.removeItem(LOGIN_TABLE);
    this.router.navigate(['/']);
    this.authSubject.next(false);
    this.isLogin = false;
  }

  isLoggedIn():boolean {
    const loginData = sessionStorage.getItem(LOGIN_TABLE);

    this.isLogin = loginData === null ? false : true;
    this.authSubject.next(this.isLogin);
    return this.isLogin;
  }

  getEmployeeId(): number {
    const loginData = sessionStorage.getItem(LOGIN_TABLE);
    return loginData === null ? null : JSON.parse(loginData).employeeId;
  }

  getSubject(): Observable<boolean> {
    return this.authSubject.asObservable();
  }
}
