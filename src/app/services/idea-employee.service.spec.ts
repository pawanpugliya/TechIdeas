import { TestBed } from '@angular/core/testing';
import { IdeaEmployeeModel } from '../interfaces/idea-employee.model';
import { IDEA_EMPLOYEE_TABLE } from './constants';

import { IdeaEmployeeService } from './idea-employee.service';

describe('IdeaEmployeeService', () => {
  let service: IdeaEmployeeService;
  let ideaEmployees: IdeaEmployeeModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdeaEmployeeService);

    ideaEmployees = [
      {title: 'AI model', employeeId: 123456, createdOn: new Date().getTime(), votes: 0},
      {title: 'Cov19 analytics', employeeId: 111111, createdOn: new Date().getTime(), votes: 0}]
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all employees submitted idea', () => {
    localStorage.setItem(IDEA_EMPLOYEE_TABLE, JSON.stringify(ideaEmployees));

    const ideaEmployeeList = service.getAll();
    expect(ideaEmployeeList.length).toBe(ideaEmployees.length);
  });

  it('should add idea employee mapping', () => {
    const ideaEmployeeToAdd: IdeaEmployeeModel = {
      title: 'AI model',
      employeeId: 123456,
      createdOn: new Date().getTime(),
      votes: 0
    }
    service.addIdeaEmployee(ideaEmployeeToAdd);

    const ideaEmployee: IdeaEmployeeModel[] = service.getIdeasByEmployeeId(123456);

    expect(ideaEmployee[0].title).toBe('AI model');
  });

  it('should delete idea employee mapping', () => {
    localStorage.setItem(IDEA_EMPLOYEE_TABLE, JSON.stringify(ideaEmployees));

    service.deleteIdeaEmployee(ideaEmployees[0].title);

    expect(service.getAll().length).toBe(1);
  });

  it('should get all ideas from employee id', () => {
    localStorage.setItem(IDEA_EMPLOYEE_TABLE, JSON.stringify(ideaEmployees));

    let employeeIdeas: IdeaEmployeeModel[] = service.getIdeasByEmployeeId(123456);

    expect(employeeIdeas.length).toBe(1);
  });

  it('should get idea from title and employee id', () => {
    localStorage.setItem(IDEA_EMPLOYEE_TABLE, JSON.stringify(ideaEmployees));

    let employeeIdea: IdeaEmployeeModel = service.getIdeaByEmployeeIdAndTitle(123456, 'AI model');

    expect(employeeIdea).toBeDefined();
  });


});
