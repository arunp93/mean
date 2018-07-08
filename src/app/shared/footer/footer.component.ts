import { Component, OnInit } from '@angular/core';

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

    }

}
