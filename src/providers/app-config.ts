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

//imageUrl="http://183.82.33.232:8097/"; 
	// rooturl="http://192.168.1.20:8000/api/"; 
	 

 //imageUrl="http://183.82.33.232:8097/"; 
 imageUrl="http://52.91.174.4:8096/";
 //imageUrl="http://192.168.1.20:8000/"; 
 rooturl=this.imageUrl+"api/";

  constructor(public http: Http) {
  }
  setImageurl()
  {
  	return this.imageUrl; 
  }
  public setrooturl()
  {
    console.log("app"+this.rooturl);
  	return this.rooturl; 
  }
  
}
