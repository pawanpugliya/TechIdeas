import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be logged-in', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should have no employee id when not logged in', () => {
    expect(service.getEmployeeId()).toBeNull();
  })

  it('should login', () => {
    service.login(123456, '123456');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should have employee id when logged in', () => {
    service.login(234567, '234567');
    expect(service.getEmployeeId()).toBe(234567);
  });

  it('should logout', () => {
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });
});
