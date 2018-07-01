import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './home/page-home/page-home.component';
import { PageAboutComponent } from './about/page-about/page-about.component';
import { AppComponent } from './app.component';
import { PageContactComponent } from './contact/page-contact/page-contact.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {NewsCreateComponent } from './news-create/news-create.component';
import {NewsDisplayComponent } from './news-display/news-display.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { ResetComponent } from './reset/reset.component';
import { ForgotComponent } from './forgot/forgot.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: PageHomeComponent
  },
  {
    path: 'about',
    component: PageAboutComponent
  },
  {
    path: 'contact',
    component: PageContactComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },

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
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' }
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
      path: 'reset',
      component: ResetComponent,
      data: { title: 'Reset' }
    }
  ,
  {
        path: 'forgot',
        component: ForgotComponent,
        data: { title: 'Forgot' }
       }
  ,
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
