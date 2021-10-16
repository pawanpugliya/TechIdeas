import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogin = false;
  loginSubscription = new Subscription();

  constructor(private authService: AuthService) {
    this.loginSubscription = authService.getSubject()
      .subscribe(isLogin => {
        this.isLogin = isLogin
      });
  }

  ngOnInit():void {

  }

  onLogout():void {
    this.authService.logout();
  }

  toggleNav():void {
    const navbarContent = document.querySelector('#navbarSupportedContent');
    navbarContent?.classList.toggle('show');
  }

  ngOnDestroy():void {
    this.loginSubscription.unsubscribe();
  }
}
