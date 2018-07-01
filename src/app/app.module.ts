import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {NewsCreateComponent } from './news-create/news-create.component';
import {NewsDisplayComponent } from './news-display/news-display.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
const appRoutes: Routes = [
  {
    path: 'news',
    component: NewsDisplayComponent,
    data: { title: 'News List' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'news-create',
    component: NewsCreateComponent,
    data: { title: 'Create News' }
  },
  {
    path: 'reset',
    component: ResetComponent,
    data: { title: 'Reset' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'news-details/:id',
    component: NewsDetailsComponent,
    data: { title: 'News Details' }
  },
  {
    path: 'news-edit/:id',
    component: NewsEditComponent,
    data: { title: 'News Edit' }
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    data: { title: 'Forgot' }
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsDisplayComponent,
    NewsCreateComponent,
    SignupComponent,
    NewsDetailsComponent,
    NewsEditComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true, enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
