import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsDetailsComponent implements OnInit {
  news: any = {};
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }
  ngOnInit() {
    this.getNewsDetail(this.route.snapshot.params['id']);
  }
  getNewsDetail(id) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
    };
    this.http.get('/api/news/' + id, httpOptions).subscribe(data => {
      this.news = data;
      console.log(this.news);
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }
  deleteNews(id) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
    };
    this.http.delete('/api/news/' + id , httpOptions).subscribe(data => {
          this.router.navigate(['/news']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
