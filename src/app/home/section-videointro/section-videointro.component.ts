import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-section-videointro',
  templateUrl: './section-videointro.component.html',
  styleUrls: ['./section-videointro.component.scss']
})
export class SectionVideointroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function() {
      if ($(window).width() <= 1366) {
          const imagebg = '/assets/mainback.jpg';
          $('#video-intro').attr('src', imagebg);
      } else if ($(window).width() > 1366) {
          const videoFile = 'http://ec2-18-222-53-208.us-east-2.compute.amazonaws.com:8000/assets/backgroundvideo.mp4';
          $('#video-intro').attr('src', videoFile);
   }
  });
  }
}
