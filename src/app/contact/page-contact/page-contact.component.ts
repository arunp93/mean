import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import {} from '@types/googlemaps';
@Component({
  selector: 'app-page-contact',
  templateUrl: './page-contact.component.html',
  styleUrls: ['./page-contact.component.scss']
})
export class PageContactComponent implements OnInit {
  constructor() {}
  OpenfeedbackForm() {
    window.open('https://goo.gl/forms/0t6p2pFRJobEzzZI2');
  }
  ngOnInit() {
    $(document).ready(function() {
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
          if ( $(hash).offset().top !== 0) {
            const targetTop = $(hash).offset().top - $('.contentContainer').offset(80).top;
            // $('#contentContainer').animate({scrollTop: $(hash).offset().top }, 'slow');
            $('.contentContainer').scrollTop(targetTop);

             // Add hash (#) to URL when done scrolling (default click behavior)
     window.location.hash = hash;
          }


        } // End if
      });
    });
    // Regular map
    // function regular_map() {
    //   const var_location = new google.maps.LatLng(40.725118, -73.997699);

    //   const var_mapoptions = {
    //     center: var_location,
    //     zoom: 14
    //   };

    //   const var_map = new google.maps.Map(
    //     document.getElementById('map-container'),
    //     var_mapoptions
    //   );

    //   const var_marker = new google.maps.Marker({
    //     position: var_location,
    //     map: var_map,
    //     title: 'New York'
    //   });
    // }

    // Initialize maps
    // google.maps.event.addDomListener(window, 'load', regular_map);
  }
}
