import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotData = { username: '', password: ''};
  message = '';
  data: any;
    constructor(private http: HttpClient, private router: Router) { }


  ngOnInit() {
  }
  forgot() {
    this.http.post('/api/forgot', this.forgotData).subscribe(resp => {
      this.data = resp;
      sessionStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['reset']);
    }, err => {
      this.message = err.error.msg;
    });
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
