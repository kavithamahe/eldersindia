import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the CreateMessage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CreateMessage {
headers;
token:string;
options:any;
rootUrl:any;

  constructor(public http: Http, public storage:Storage) {
    this.storage.ready().then(() => {
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
       console.log("root url"+this.rootUrl);
    });
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    
    console.log("create message"+this.rootUrl);
   });
  }
  sendMessage(messageObject)
  {
    let _request= messageObject;
    return this.http.post(this.rootUrl+'sendMessage',_request,this.options)
      .map(res => res.json()); 
  }
  getFriendsList()
  {
    console.log("get friends"+this.rootUrl);
     let _request= {};
    return this.http.post(this.rootUrl+'getConnections',_request,this.options)
      .map(res => res.json()); 
  }

}
