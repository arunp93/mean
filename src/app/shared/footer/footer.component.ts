import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  OpenfeedbackForm() {
    window.open('https://goo.gl/forms/0t6p2pFRJobEzzZI2');
  }

  ngOnInit() {
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }


    }

}
