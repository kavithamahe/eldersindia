import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppConfig provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AppConfig {
  imageUrl="http://52.91.174.4:8095/"; 
  rooturl=this.imageUrl+"api/";

  constructor(public http: Http) {
  }
  setImageurl()
  {
  	return this.imageUrl; 
  }
  public setrooturl()
  {
  	return this.rooturl; 
  }
  
}
