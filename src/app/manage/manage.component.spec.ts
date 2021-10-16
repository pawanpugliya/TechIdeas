import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IdeaService } from '../services/idea.service';
import { RouterTestingModule } from '@angular/router/testing';

import { ManageComponent } from './manage.component';
import { IdeaCardModel } from '../idea-card/idea-card.model';

describe('ManageComponent', () => {
  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no ideas suggested at first', () => {
    const nativeElement:HTMLElement = fixture.nativeElement;
    const infoMessage = nativeElement.querySelector<HTMLElement>('#infoMessage');
    expect(infoMessage?.innerText).toContain('do not');
  });

  xit('should show idea when added', () => {
    const myIdeas: IdeaCardModel[] = [{
      title: 'AI model',
      description: 'AI modelling description',
      tags: ['tech'],
      votes: 2,
      createdOn: new Date().getTime(),
      createdBy: 111111
    }];

    component.myIdeas = myIdeas;
    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;
    const appIdeaCards: HTMLElement[] = Array.from(nativeElement.querySelectorAll('app-idea-card'));
    const appIdeaCard: HTMLElement | null = appIdeaCards[0].querySelector('.card-title');
    expect(appIdeaCard?.innerText).toBe(myIdeas[0].title);
  });

});
