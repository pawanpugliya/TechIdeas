import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IdeaCardModel } from '../idea-card/idea-card.model';
import { IdeaService } from '../services/idea.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy {
  
  myIdeas:IdeaCardModel[] = [];
  isLogin: boolean = false;
  loginSubscription:Subscription = new Subscription();
  ideaSubscription: Subscription = new Subscription();

  constructor(
    private ideaService:IdeaService, 
    private authService:AuthService) {

      this.loginSubscription = this.authService.getSubject()
      .subscribe(isLogin => {
        console.log(isLogin);
        this.isLogin = isLogin
      });

      this.ideaSubscription = this.ideaService.getSubject().subscribe(action => {
        if(['ADD_IDEA', 'DELETE_IDEA'].includes(action.type)) {
          this.myIdeas = this.ideaService.getMyIdeas();
        }
      });
    }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
    this.ideaSubscription.unsubscribe();
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.myIdeas = this.ideaService.getMyIdeas();
    }
  }
}
