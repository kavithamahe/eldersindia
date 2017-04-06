import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the MessagesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessagesService {
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

  inbox() {  
   let _request= {search: {title: "", status: "", category: ""}};
    return this.http.post(this.rootUrl+'listInbox',_request,this.options)
      .map(res => res.json()); 
  }
  sent() {  
   let _request= {searchValue: ""};
    return this.http.post(this.rootUrl+'listSent',_request,this.options)
      .map(res => res.json()); 
  }
  viewMessages(messageId,viewType) {  
   let _request= {"viewType":viewType};
    return this.http.post(this.rootUrl+'getInboxMessageDetails/'+messageId,_request,this.options)
      .map(res => res.json()); 
  }
  sendMessage(messageObject)
  {
    let _request= messageObject;
    return this.http.post(this.rootUrl+'sendMessage',_request,this.options)
      .map(res => res.json()); 
  }
  getFriendsList()
  {
     let _request= {};
    return this.http.post(this.rootUrl+'getConnections',_request,this.options)
      .map(res => res.json()); 
  }
}
