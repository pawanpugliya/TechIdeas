import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IdeaLikesService } from '../services/idea-likes.service';
import { IdeaService } from '../services/idea.service';
import { IdeaCardModel } from './idea-card.model';

@Component({
  selector: 'app-idea-card',
  templateUrl: './idea-card.component.html',
  styleUrls: ['./idea-card.component.css']
})
export class IdeaCardComponent implements OnInit, OnDestroy {
  @Input() idea:IdeaCardModel|any = {};
  @Input() removable:boolean = false;
  @Input() likeable:boolean = false;
  @Input() mode:string = '';
  @Input() isLogin:boolean = false;

  userLiked:boolean = false;
  likeSubscription:Subscription = new Subscription();

  constructor(
    private ideaService:IdeaService,
    private ideaLikesService:IdeaLikesService,
    private authService:AuthService) {
      this.likeSubscription = ideaLikesService.getSubject()
        .subscribe(data => {
          if(this.idea.title === data.title) {
            this.userLiked = data.liked;
            this.idea.votes = data.count
          }
        });
  }

  ngOnInit(): void {
    const userLikedItem = this.ideaLikesService
      .getLikesByEmployeeId(this.authService.getEmployeeId())
      .find(like => like.title === this.idea.title);

    this.userLiked = userLikedItem ? true : false;
  }

  ngOnDestroy() {
    this.likeSubscription.unsubscribe();
  }

  deleteCard(title:string) {
    this.ideaService.deleteIdea(title);
  }

  onLikeDislike(title:string, likeFlag:boolean) {
    this.ideaLikesService.updateLike(title, likeFlag);
  }
}
