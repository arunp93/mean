import { Component, OnInit } from '@angular/core';
declare var $: any ;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
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
     currentSize = parseFloat(currentSize) * 1.2;
     $('body').css('font-size', currentSize);
     return false;
      });
      // Decrease Font Size
      $('#sizedown').click(function(){
     const currentFontSize = $('body').css('font-size');
     let currentSize = $('body').css('font-size');
     currentSize = parseFloat(currentSize) * 0.8;
     $('body').css('font-size', currentSize);
     return false;
      });
   });
  }
}
