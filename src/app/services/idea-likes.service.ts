import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { LikeModel } from '../interfaces/like.model';
import { Observable, Subject } from 'rxjs';
import { IDEA_LIKES_TABLE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class IdeaLikesService {
  private likeSubject = new Subject<any>();

  constructor(private authService:AuthService) {

  }

  getAllLikes():LikeModel[] {
    const likeItems = localStorage.getItem(IDEA_LIKES_TABLE);
    return likeItems === null ? [] : JSON.parse(likeItems);
  }

  getLikesByTitle(title:string):LikeModel[] {
    return this.getAllLikes().filter(like => like.title === title);
  }

  getLikesCount(title:string):number {
    return this.getLikesByTitle(title).length;
  }

  getLikesByEmployeeId(employeeId:number):LikeModel[] {
    return this.getAllLikes().filter(like => like.employeeId === employeeId);
  }

  updateLike(title:string, liked:boolean) {
    const likeItems:LikeModel[] = this.getAllLikes();
    const likeItem:LikeModel = { title, employeeId: this.authService.getEmployeeId() };

    if(liked) {
      likeItems.push(likeItem);
    } else {
      const likeIndex:number = likeItems.findIndex(
        like => like.title === title
        && like.employeeId === likeItem.employeeId);
      likeItems.splice(likeIndex, 1);
    }

    localStorage.setItem(IDEA_LIKES_TABLE, JSON.stringify(likeItems));
    const count:number = this.getLikesCount(title);
    this.likeSubject.next({ title, liked, count });
  }

  deleteLike(title: string) {
    const filteredLikes:LikeModel[] = this.getAllLikes().filter(like => like.title !== title);
    localStorage.setItem(IDEA_LIKES_TABLE, JSON.stringify(filteredLikes));
  }

  getSubject():Observable<any> {
    return this.likeSubject.asObservable();
  }
}
