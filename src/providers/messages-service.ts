import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';

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

  constructor(public http: Http, public storage:Storage,public toastCtrl: ToastController) {
    this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      console.log("consroot"+this.rootUrl);
    });
    console.log("storage call");
   });
  }
 showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
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
  inboxScroll(nextPageURL)
  {
    let _request= {search: {title: "", status: "", category: ""}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
  }
  sentScroll(nextPageURL)
  {
    let _request= {searchValue: ""};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
  }
}
