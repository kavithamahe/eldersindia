import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class Externallinks {
headers;
token:string;
options:any;
rootUrl:any;

  constructor(public http: Http, public storage:Storage) {
   this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; });
   });
  }


   externalLinksList(){
     let _request= {"search": {"title": ""}, "postType": "usefullLinks"} 
      return this.http.post(this.rootUrl+`normaListNewsEvents`,_request,this.options)
      .map(res => res.json()); 
   }
   externalListLinks(){ 
      return this.http.post(this.rootUrl+`getUsefullLinks`,"",this.options)
      .map(res => res.json()); 
   }
   linksscroll(nextPageURL){
   	 let _request= {"search": {"title": ""}, "postType": "usefullLinks"}
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
}
