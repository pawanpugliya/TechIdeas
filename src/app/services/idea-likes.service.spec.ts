import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LikeModel } from '../interfaces/like.model';
import { IDEA_LIKES_TABLE } from './constants';

import { IdeaLikesService } from './idea-likes.service';

describe('IdeaLikesService', () => {
  let service: IdeaLikesService;
  let likeModels: LikeModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(IdeaLikesService);

    likeModels = [{
      title: 'AI model',
      employeeId: 123456
    }, {
      title: 'AI model',
      employeeId: 111111
    }, {
      title: 'USer profiling',
      employeeId: 123456
    }];
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all likes', () => {
    localStorage.setItem(IDEA_LIKES_TABLE, JSON.stringify(likeModels));

    const likes = service.getAllLikes();
    expect(likes[0].title).toBe(likeModels[0].title);
    expect(likes[1].title).toBe(likeModels[1].title);
  });

  it('should get all likes for the given title', () => {

    localStorage.setItem(IDEA_LIKES_TABLE, JSON.stringify(likeModels));

    const likes = service.getLikesByTitle('AI model');
    expect(likes).toHaveSize(2);
    expect(likeModels).toContain(likes[0]);
    expect(likeModels).toContain(likes[1]);
  });

  it('should get likes for the given employeeId', () => {
    localStorage.setItem(IDEA_LIKES_TABLE, JSON.stringify(likeModels));

    const likes = service.getLikesByEmployeeId(111111);
    expect(likes).toHaveSize(1);
    expect(likeModels).toContain(likes[0]);
  });

  it('should like the title', () => {
    const authServiceSpy = jasmine.createSpyObj(
      'AuthService', ['getEmployeeId']);
    authServiceSpy.getEmployeeId.and.returnValue(123456);
    localStorage.setItem(IDEA_LIKES_TABLE, JSON.stringify(likeModels));

    service = new IdeaLikesService(authServiceSpy);
    service.updateLike('Cov19 analytics', true);
    const likes = service.getAllLikes();
    expect(likes.length).toBe(likeModels.length + 1);
  });

  it('should unlike the title', () => {
    const authServiceSpy = jasmine.createSpyObj(
      'AuthService', ['getEmployeeId']);
    authServiceSpy.getEmployeeId.and.returnValue(123456);
    localStorage.setItem(IDEA_LIKES_TABLE, JSON.stringify(likeModels));

    service = new IdeaLikesService(authServiceSpy);
    service.updateLike(likeModels[0].title, false);
    const likes = service.getAllLikes();
    expect(likes.length).toBe(likeModels.length - 1);
  });
});
