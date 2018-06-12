import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewsEditComponent implements OnInit {
  news: any = {};
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getNews(this.route.snapshot.params['id']);
  }
  getNews(id) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
    };
    this.http.get('/api/news/' + id , httpOptions).subscribe(data => {
      this.news = data;
    });
  }

  updateNews(id) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('jwtToken') })
    };
    this.http.put('/api/news/' + id, this.news , httpOptions)
      .subscribe(res => {
          // const id = res['_id'];
          this.router.navigate(['/news-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
