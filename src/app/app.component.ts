import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService) {
      translate.addLangs(['en', 'de']);
      translate.setDefaultLang('en');
  }
  useLanguage(language: string) {
      this.translate.use(language);
    }
}


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
