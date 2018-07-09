import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.scss']
})
export class PageAboutComponent implements OnInit {
  constructor() {}
  downloadPDFeng() {
    if (confirm('This link shall take you to a page/website outside this website')) {
      window.open('assets/aboutpdf/about-pdf-eng.pdf');
    }
  }
  downloadPDFmal() {
    if (confirm('This link shall take you to a page/website outside this website. ')) {
    window.open('/assets/aboutpdf/about-pdf-mal.pdf');
  }
  }
  ngOnInit() {
    $(document).ready(function() {
      $(document).on('scroll', onScroll);
      // Add smooth scrolling to all links
      $('a').on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          const hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate(
            {
              scrollTop: $(hash).offset().top
            },
            800,
            function() {
              // Add hash (#) to URL when done scrolling (default click behavior)
              window.location.hash = hash;
              $(document).on('scroll', onScroll);
            }
          );
        } // End if
      });
    });

    function onScroll(event) {
      const scrollPos = $(document).scrollTop();
      $('#aboutNavigation a').each(function() {
        const currLink = $(this);
        const refElement = $(currLink.attr('href'));
        if (
          refElement.position().top - 100 <= scrollPos &&
          refElement.position().top + refElement.height() > scrollPos
        ) {
          $('#aboutNavigation ul li a').removeClass('selected');
          currLink.addClass('selected');
        } else {
          currLink.removeClass('selected');
        }
      });
    }
  }
}
