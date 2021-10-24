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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: DashboardComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    IdeaCardComponent,
    IdeaFormComponent,
    ManageComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    // NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    AuthService, 
    IdeaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
