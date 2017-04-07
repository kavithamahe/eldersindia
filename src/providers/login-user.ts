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
    this.storage.set('rooturl',this.appConfig.setrooturl());
    this.storage.set('imageurl',this.appConfig.setImageurl()); 
   });
  this.rootUrl=this.appConfig.setrooturl();
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  }
  
  loginload(credentials) {
   let _request= {"email": credentials.email,
  "password": credentials.password}
    return this.http.post(this.rootUrl+'login',_request,this.headers)
      .map(res => res.json());
 
  }
    // setting user on login 
  currentUser(user: string) {
    console.log("user logged:",user);
    this.userSource.next(user);
  }
}
