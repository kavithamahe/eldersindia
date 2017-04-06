import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
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
  constructor(public http: Http, public storage:Storage, public appConfig:AppConfig) {
  this.storage.ready().then(() => {   
    this.storage.set('imageurl',this.appConfig.setImageurl());
    this.storage.set('rooturl',this.appConfig.setrooturl());
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl;});
   });
  this.headers = new Headers();
  this.headers.append('Content-Type', 'application/json');
  }
  loginload(credentials) {
   let _request= {"email": credentials.email,
  "password": credentials.password}
    return this.http.post('http://192.168.1.20:8000/api/login',_request,this.headers)
      .map(res => res.json());
 
  }
}
