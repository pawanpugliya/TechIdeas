import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthModel } from '../interfaces/auth.model';
import { LOGIN_TABLE } from './constants';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isLogin:boolean = false;
  
  private authSubject = new Subject<boolean>();

  constructor(private router: Router) { 
    this.isLogin = this.isLoggedIn();
  }

  login(employeeId:number, password:string):void {
    const loginData:AuthModel = {
      employeeId
    }

    localStorage.setItem(LOGIN_TABLE, JSON.stringify(loginData));
    this.router.navigate(['/']);
    this.authSubject.next(true);
    this.isLogin = true;
  }

  logout():void {
    localStorage.removeItem(LOGIN_TABLE);
    this.router.navigate(['/']);
    this.authSubject.next(false);
    this.isLogin = false;
  }

  isLoggedIn():boolean {
    const loginData = localStorage.getItem(LOGIN_TABLE);

    this.isLogin = loginData === null ? false : true; 
    this.authSubject.next(this.isLogin);
    return this.isLogin;
  }

  getEmployeeId(): number {
    const loginData = localStorage.getItem(LOGIN_TABLE);
    return loginData === null ? null : JSON.parse(loginData).employeeId;
  }

  getSubject(): Observable<boolean> {
    return this.authSubject.asObservable();
  }
}
