import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import { Storage } from '@ionic/storage';

import { AppConfig } from '../providers/app-config';
//import { Login } from '../models/login';

/*
  Generated class for the LoginUser provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginUser {
headers:any;
rootUrl:any;
// Observable string sources
  private userSource = new Subject<string>();

// Observable string streams
  userEntered$ = this.userSource.asObservable();


  constructor(public http: Http, public storage:Storage, public appConfig:AppConfig) {
  this.storage.ready().then(() => {   
    this.storage.set('imageurl',this.appConfig.setImageurl());
    this.storage.set('rooturl',this.appConfig.setrooturl());
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl;});
   });
  this.rootUrl = 'http://192.168.1.20:8000/api/'
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  }
  loginload(credentials) {
   let _request= {"email": credentials.email,
  "password": credentials.password}
    return this.http.post('http://192.168.1.20:8000/api/login',_request,this.headers)
      .map(res => res.json());
 
  }
    // Service message commands
  currentUser(user: string) {
    this.userSource.next(user);
  }
}
