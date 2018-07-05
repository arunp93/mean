import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

declare var $: any ;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    $(document).ready(function() {
      $('.hamburger').click(function() {
        $(this).toggleClass('is-active');
      });
    });

  }
  useLanguage(language: string) {
    console.log('clicked' +   this.translate.use(language) + ' lan:' + language);
        this.translate.use(language);
      }

}
