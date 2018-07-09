import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
@Component({
  selector: 'app-news-display',
  templateUrl: './news-display.component.html',
  styleUrls: ['./news-display.component.scss']
})
export class NewsDisplayComponent implements OnInit {
  news: any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
    };
    this.http.get('/api/news', httpOptions).subscribe(data => {
      this.news = data;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

}

