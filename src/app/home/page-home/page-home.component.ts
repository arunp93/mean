import { Component, OnInit } from '@angular/core';
declare var $ ;
@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#fullpage').fullpage({

      autoScrolling: true,
      scrollHorizontally: true
    });

    $.fn.fullpage.setAllowScrolling(false);
  }

}
