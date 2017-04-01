import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventsService {
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
   eventsList() 
   {  
   let _request= {"search":{"title":""},"postType":"events"};
    return this.http.post(this.rootUrl+'normaListNewsEvents',_request,this.options)
      .map(res => res.json()); 
   }
   viewEvents(eventsId) 
   {  
   let _request= {"postType":"events"};
    return this.http.post(this.rootUrl+'getNewsEventsDetails/'+eventsId,_request,this.options)
      .map(res => res.json()); 
   }
   eventsscroll(nextPageURL) 
   {  
   let _request= {"search":{"title":""},"postType":"events"};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
}
