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
    $('img:not([alt])').attr('alt', 'NTBR Image');

    const LanguageSelect = document.getElementById('languageSelection');
    const options = LanguageSelect.getElementsByClassName('languages');
    for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', function() {
    const current = document.getElementsByClassName('languageSelected');
    current[0].className = current[0].className.replace('languageSelected', 'languagenotSelected');
    this.className = this.className.replace('languagenotSelected', 'languageSelected');
    });
  }
    $(document).ready(function() {
      $('.hamburger').click(function() {
        $(this).toggleClass('is-active');
      });
    });
    $(document).ready(function(){
      const originalSize = $('body').css('font-size');
     // reset
      $('#sizereset').click(function(){
     $('body').css('font-size', originalSize);
      });
      // Increase Font Size
      $('#sizeup').click(function(){
     let currentSize = $('body').css('font-size');
     currentSize = parseFloat(currentSize) * 1.1;
     $('body').css('font-size', currentSize);
     return false;
      });
      // Decrease Font Size
      $('#sizedown').click(function(){
     const currentFontSize = $('body').css('font-size');
     let currentSize = $('body').css('font-size');
     currentSize = parseFloat(currentSize) * 0.9;
     $('body').css('font-size', currentSize);
     return false;
      });
   });
  }
  useLanguage(language: string) {
        this.translate.use(language);
        $(this).toggleClass('nav-active');
      }
}
