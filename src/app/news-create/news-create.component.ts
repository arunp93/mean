import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsCreateComponent implements OnInit {

  news = { date: '', title: '', description: '' };
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  saveNews() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
    };
    this.http.post('/api/news', this.news , httpOptions).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['news']);
    }, err => {
      this.message = err.error.msg;
    }); }
}
