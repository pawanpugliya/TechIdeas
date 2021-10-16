import { Injectable } from '@angular/core';
import { IdeaEmployeeModel } from '../interfaces/idea-employee.model';
import { IDEA_EMPLOYEE_TABLE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class IdeaEmployeeService {

  constructor() { }

  getAll(): IdeaEmployeeModel[] {
    const ideaEmployee = localStorage.getItem(IDEA_EMPLOYEE_TABLE);
    return ideaEmployee === null ? [] : JSON.parse(ideaEmployee);
  }

  addIdeaEmployee(ideaEmployee: IdeaEmployeeModel):void {
    const ideaEmployeeList = this.getAll();
    ideaEmployeeList.push(ideaEmployee);
    localStorage.setItem(IDEA_EMPLOYEE_TABLE, JSON.stringify(ideaEmployeeList));
  }

  deleteIdeaEmployee(title: string):void {
    const ideaEmployeeList: IdeaEmployeeModel[] = this.getAll();
    const filteredIdeaEmployee:IdeaEmployeeModel[] = ideaEmployeeList.filter(ideaEmployee => ideaEmployee.title !== title);
    localStorage.setItem(IDEA_EMPLOYEE_TABLE, JSON.stringify(filteredIdeaEmployee));
  }

  getIdeasByEmployeeId(employeeId:number): IdeaEmployeeModel[] {
    return this.getAll().filter(idea => idea.employeeId === employeeId);
  }

  getIdeaByEmployeeIdAndTitle(employeeId:number, title:string):IdeaEmployeeModel {
    return this.getAll().filter(item => item.employeeId === employeeId && item.title === title)[0];
  }
}
