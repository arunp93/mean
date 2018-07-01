import { Component, OnInit } from '@angular/core';
declare var $: any ;
@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.scss']
})
export class PageAboutComponent implements OnInit {

  constructor() { }
  downloadPDF() {
    window.open('/assets/about-pdf.pdf');
  }
  ngOnInit() {

    $('ul li a[href^=\'#\']').on('click', function(e) {

      // prevent default anchor click behavior
      e.preventDefault();

      // store hash
      const hash = this.hash;
      console.log(' before function ' + $(hash).offset().top);
      // animate
      $('.contentBasediv, .contentContainer').animate({
          scrollTop: $(hash).offset().top
        }, 1000, function() {
          console.log('in function' + $(hash).offset().top);
          // when done, add hash to url
          // (default click behaviour)
          window.location.hash = hash;
        });

        console.log('after function' + $(hash).offset().top);

   });
  }

}
