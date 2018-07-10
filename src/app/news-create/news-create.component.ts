import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient , HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsCreateComponent implements OnInit {

   news = {  date: '', title: '', description: '' };
  message = '';
  // data: any;

  constructor(private http: HttpClient, private router: Router, private el: ElementRef) { }

  ngOnInit() {
  }
  upload() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
     };
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    const fileCount: number = inputEl.files.length;
       const formData = new FormData();
      formData.append('file', inputEl.files.item(0));
      formData.append('date', this.news.date);
      formData.append('title', this.news.title);
      formData.append('description', this.news.description);
    this.http.post('/api/news', formData , httpOptions).subscribe(resp => {
      this.router.navigate(['news']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}
