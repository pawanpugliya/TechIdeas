import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  afterEach(() => {

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be logged in by default', () => {
    expect(component.isLogin).toBe(false);
  });

  it('should have Login button visible when NOT logged in', () => {
    const nativeElement:HTMLElement = fixture.nativeElement;
    const loginItem = Array.from(nativeElement.querySelectorAll<HTMLElement>('.nav-item'))
      .find(item => item.innerText === 'Login');
    expect(loginItem).toBeTruthy();
  });

  it('should have Manage and Logout button visible when logged in', () => {
    component.isLogin = true;
    fixture.detectChanges();

    const nativeElement:HTMLElement = fixture.nativeElement;
    const navItems = Array.from(nativeElement.querySelectorAll<HTMLElement>('.nav-item'))
      .filter(item => item.innerText === 'Logout' || item.innerText === 'Manage');
    expect(navItems[0]).toBeTruthy();
    expect(navItems[1]).toBeTruthy();
  });
});
