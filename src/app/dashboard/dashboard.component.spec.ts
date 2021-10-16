import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IdeaCardModel } from '../idea-card/idea-card.model';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no dashboard items', () => {
    const {nativeElement} = fixture;
    expect(nativeElement.querySelector('div').innerText).toContain('no ideas');
  });

  it('should show sort options when dashboard items are available', () => {
    component.dashboardItems = [{
      title: 'AI model',
      description: 'AI modelling description',
      tags: ['tech'],
      votes: 2,
      createdOn: new Date().getTime(),
      createdBy: 111111
    }];
    fixture.detectChanges();

    const {nativeElement} = fixture;
    expect(nativeElement.querySelector('#sortBy')).toBeTruthy();
  });
});
