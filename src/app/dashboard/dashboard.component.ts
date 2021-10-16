import { Component, OnDestroy, OnInit } from '@angular/core';
import { IdeaService } from '../services/idea.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IdeaCardModel } from '../idea-card/idea-card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardItems: IdeaCardModel[] = [];
  loginSubscription: Subscription = new Subscription();
  isLogin = false;

  constructor(
    private authService:AuthService,
    private ideaService: IdeaService) {

    this.loginSubscription = this.authService.getSubject()
      .subscribe(isLogin => {
        this.isLogin = isLogin
      });
    this.isLogin = this.authService.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dashboardItems = this.ideaService.getDashboardItems();
  }

  onSortBy(event: Event): void {
    const sortBy = (<HTMLInputElement>event.target).value;

    switch (sortBy) {
      case 'votes':
        this.dashboardItems.sort((item1, item2) => item2.votes - item1.votes);
        break;

      case 'date':
        this.dashboardItems.sort((item1, item2) => item2.createdOn - item1.createdOn);
        break;

      default:
        break;
    }
  }
}