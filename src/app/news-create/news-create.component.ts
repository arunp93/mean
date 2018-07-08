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

   news = { date: '', title: '', description: '' };
  message = '';
  // data: any;

  constructor(private http: HttpClient, private router: Router, private el: ElementRef) { }

  ngOnInit() {
    
  }
  // saveNews() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
  //   };
  //   // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
  //   // let fileCount: number = inputEl.files.length;
  //   // let formData = new FormData();
  //   // if (fileCount > 0) {
  //   //   formData.append('file', inputEl.files.item(0));
  //   // }
  //   // console.log(formData);
  //   this.http.post('/api/news', this.news , httpOptions).subscribe(resp => {
  //     console.log(resp);
  //     this.router.navigate(['news']);
  //   }, err => {
  //     this.message = err.error.msg;
  //   }); 
  // }
  upload() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
     };
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#file');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
      formData.append('file', inputEl.files.item(0));
      formData.append('date', this.news.date);
      formData.append('title', this.news.title);
      formData.append('description', this.news.description);
    this.http.post('/api/news', formData ,httpOptions).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['news']);
    }, err => {
      this.message = err.error.msg;
    });
  }
}
