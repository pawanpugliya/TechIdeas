import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { ManageComponent } from './manage/manage.component';
import { IdeaCardComponent } from './idea-card/idea-card.component';
import { IdeaFormComponent } from './idea-form/idea-form.component';
import { IdeaService } from './services/idea.service';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    IdeaCardComponent,
    IdeaFormComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    // NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [
    AuthService, 
    IdeaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
