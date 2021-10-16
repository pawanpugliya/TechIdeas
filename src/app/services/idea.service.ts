import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IdeaEmployeeService } from './idea-employee.service';
import { IdeaLikesService } from './idea-likes.service';
import { IdeaEmployeeModel } from '../interfaces/idea-employee.model';
import { IdeaModel } from '../interfaces/idea.model';
import { Observable, Subject } from 'rxjs';
import { IdeaCardModel } from '../idea-card/idea-card.model';
import { IDEAS_TABLE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private ideaSubject = new Subject<any>();

  constructor(
    private authService:AuthService,
    private ideaEmployeeService:IdeaEmployeeService,
    private ideaLikeService:IdeaLikesService) { }

  addIdea(idea:IdeaModel): void {
    const loginData = this.authService.isLoggedIn();
    if (loginData) {
      // Add/update ideas prop in local storage
      const employeeId = this.authService.getEmployeeId();
      const ideasList:IdeaModel[] = this.getIdeasList();
      ideasList.push(idea);
      localStorage.setItem(IDEAS_TABLE, JSON.stringify(ideasList));

      // Map idea to idea-employee prop in local storage (add/update)
      const ideaEmployee:IdeaEmployeeModel = {title: idea.title, employeeId, votes: 0, createdOn: new Date().getTime()};
      this.ideaEmployeeService.addIdeaEmployee(ideaEmployee);

      this.ideaSubject.next({type: 'ADD_IDEA'});
    }
  }

  getIdeasList(): IdeaModel[] {
    const ideas = localStorage.getItem(IDEAS_TABLE);
    return ideas === null ? [] : JSON.parse(ideas);
  }

  getIdeaByTitle(title:string): IdeaModel {
    return this.getIdeasList().filter(idea => idea.title === title)[0];
  }

  deleteIdea(title: string): void {
    // Delete ideaEmployee entries matching title
    this.ideaEmployeeService.deleteIdeaEmployee(title);

    // Delete likes matching given title
    this.ideaLikeService.deleteLike(title);

    // Delete idea in the end
    const ideasList: IdeaModel[] = this.getIdeasList();
    const deleteIdeaIndex:number = ideasList.findIndex(item => item.title === title);
    ideasList.splice(deleteIdeaIndex, 1);
    localStorage.setItem(IDEAS_TABLE, JSON.stringify(ideasList));

    this.ideaSubject.next({type: 'DELETE_IDEA'});
  }

  getMyIdeas() {
    const myIdeas:IdeaCardModel[] = [];
    const employeeId = this.authService.getEmployeeId();

    if(employeeId) {
      const ideaEmployees:IdeaEmployeeModel[] = this.ideaEmployeeService.getIdeasByEmployeeId(employeeId);
      ideaEmployees.forEach(
        item => myIdeas.push(
          this.getCardItem(item.title, item.createdOn, item.employeeId))
      );
    }
    // Sort by creation date (recent first)
    myIdeas.sort((item1, item2) => item2.createdOn - item1.createdOn);
    return myIdeas;
  }

  getDashboardItems() {
    const dashboardItems:IdeaCardModel[] = [];
    const ideaEmployeesAll:IdeaEmployeeModel[] = this.ideaEmployeeService.getAll();
    ideaEmployeesAll.forEach(
      item => dashboardItems
        .push(this.getCardItem(item.title, item.createdOn, item.employeeId))
    );
    return dashboardItems;
  }

  getCardItem(title: string, createdOn: number, createdBy:number) {
    const idea:IdeaModel = this.getIdeaByTitle(title);

    const cardDataItem:IdeaCardModel = {
      title,
      createdOn,
      createdBy,
      votes: this.ideaLikeService.getLikesCount(title),
      description: idea.description,
      tags: idea.tags
    }
    return cardDataItem;
  }

  getSubject():Observable<any> {
    return this.ideaSubject.asObservable();
  }
}
