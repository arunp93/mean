      import { Component, OnInit, ViewEncapsulation } from '@angular/core';
      import { HttpClient } from '@angular/common/http';
      import { ActivatedRoute, Router } from '@angular/router';

      @Component({
        selector: 'app-modalbox',
        templateUrl: './modalbox.component.html',
        styleUrls: ['./modalbox.component.scss']
      })
      export class ModalboxComponent implements OnInit {
        news: any = {};
      constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

        ngOnInit() {
          this.getModal(this.route.snapshot.params['id']);
        }
        getModal(id) {
          this.http.get('/api/modal/' + id).subscribe(data => {
            this.news = data;
            console.log(this.news);
          }, err => {
            if (err.status === 401) {
              this.router.navigate(['home']);
            }
          });
        }
        down(id) {
          let path;
          this.http.get('/api/modall/' + id).subscribe(data => {
            path = data;
            if (path) {
              if (confirm('This link shall take you to a page/website outside this website. ')) {
                window.open(path);
              }
            } else {
              alert('No attachments');
            }
          }, err => {
            if (err.status === 401) {
              this.router.navigate(['home']);
            }
          });
        }


        }

