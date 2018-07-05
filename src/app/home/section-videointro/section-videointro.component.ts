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
          const videoFile = '/assets/bgvideo.mp4';
          $('#video-intro').attr('src', videoFile);
   }
  });
  }
}
