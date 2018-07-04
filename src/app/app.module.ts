import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { PageHomeComponent } from './home/page-home/page-home.component';
import { SectionVideointroComponent } from './home/section-videointro/section-videointro.component';
import { SectionLiveComponent } from './home/section-live/section-live.component';
import { SectionAccordionComponent } from './home/section-accordion/section-accordion.component';
import { PageAboutComponent } from './about/page-about/page-about.component';
import { PageContactComponent } from './contact/page-contact/page-contact.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {NewsCreateComponent } from './news-create/news-create.component';
import {NewsDisplayComponent } from './news-display/news-display.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    SectionVideointroComponent,
    SectionLiveComponent,
    SectionAccordionComponent,
    PageAboutComponent,
    PageContactComponent,
    FooterComponent,
    NavbarComponent,
    GalleryComponent,
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
    AppRoutingModule
  ],
  providers: [ HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
