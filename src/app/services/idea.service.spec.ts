import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IdeaEmployeeModel } from '../interfaces/idea-employee.model';
import { IdeaModel } from '../interfaces/idea.model';
import { IDEAS_TABLE } from './constants';
import { IdeaLikesService } from './idea-likes.service';

import { IdeaService } from './idea.service';

describe('IdeaService', () => {
  let service: IdeaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(IdeaService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new idea', () => {
    const newIdeaStub:IdeaModel = {
      title: 'AI model',
      description: 'Generate AI data model for the users',
      tags: ['tech']
    };

    const newIdeaEmployeeStub:IdeaEmployeeModel = {
      title: newIdeaStub.title,
      employeeId: 123456,
      votes: 0,
      createdOn: new Date().getTime()
    }

    const authServiceSpy = jasmine.createSpyObj(
      'AuthService', ['isLoggedIn', 'getEmployeeId']);
    const ideaEmployeeServiceSpy = jasmine.createSpyObj(
      'IdeaEmployeeService', ['addIdeaEmployee']);
    const ideaLikeServiceSpy = jasmine.createSpyObj(
      'IdeaLikeService', [undefined]
    );

    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getEmployeeId.and.returnValue(123456);
    ideaEmployeeServiceSpy.addIdeaEmployee.and.returnValue(newIdeaEmployeeStub);

    service = new IdeaService(authServiceSpy, ideaEmployeeServiceSpy, ideaLikeServiceSpy);

    service.addIdea(newIdeaStub);
    const idea:IdeaModel = service.getIdeaByTitle(newIdeaStub.title);
    expect(idea).toEqual(newIdeaStub);
  });

  it('should get list of ideas', () => {
    const newIdeaStub:IdeaModel = {
      title: 'AI model',
      description: 'Generate AI data model for the users',
      tags: ['tech']
    };

    localStorage.setItem(IDEAS_TABLE, JSON.stringify([newIdeaStub]));

    expect(service.getIdeasList()).toEqual([newIdeaStub]);
  });

  it('should get idea by title', () => {
    const newIdeaStub:IdeaModel = {
      title: 'AI model',
      description: 'Generate AI data model for the users',
      tags: ['tech']
    };

    localStorage.setItem(IDEAS_TABLE, JSON.stringify([newIdeaStub]));

    expect(service.getIdeaByTitle(newIdeaStub.title)).toEqual(newIdeaStub);
  });

  it('should delete the idea', (done: DoneFn) => {
    const newIdeaStub:IdeaModel = {
      title: 'AI model',
      description: 'Generate AI data model for the users',
      tags: ['tech']
    };

    const newIdeaEmployeeStub:IdeaEmployeeModel = {
      title: newIdeaStub.title,
      employeeId: 123456,
      votes: 0,
      createdOn: new Date().getTime()
    }

    const authServiceSpy = jasmine.createSpyObj(
      'AuthService', ['isLoggedIn', 'getEmployeeId']);
    const ideaEmployeeServiceSpy = jasmine.createSpyObj(
      'IdeaEmployeeService', ['addIdeaEmployee', 'deleteIdeaEmployee']);
    const ideaLikeServiceSpy = jasmine.createSpyObj(
      'IdeaLikeService', ['deleteLike']
    );

    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getEmployeeId.and.returnValue(123456);
    ideaEmployeeServiceSpy.addIdeaEmployee.and.returnValue(newIdeaEmployeeStub);
    ideaEmployeeServiceSpy.deleteIdeaEmployee.and.returnValue(newIdeaStub.title);
    ideaLikeServiceSpy.deleteLike.and.returnValue(newIdeaStub.title);

    service = new IdeaService(authServiceSpy, ideaEmployeeServiceSpy, ideaLikeServiceSpy);

    service.addIdea(newIdeaStub);

    service.deleteIdea(newIdeaStub.title);

    expect(service.getIdeaByTitle(newIdeaStub.title)).toBeUndefined();
    done();
  });
});
