import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
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

  constructor(public http: Http, public storage:Storage,private transfer: Transfer,private filePath: FilePath,public toastCtrl: ToastController) {
    this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
    });
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
  inbox(inbox) {  
   let _request= {"search": inbox}
    return this.http.post(this.rootUrl+'listInbox',_request,this.options)
      .map(res => res.json()); 
  }
  inboxSearch(term){
    let _request= {"search": term}
    return this.http.post(this.rootUrl+'listInbox',_request,this.options)
      .map(res => res.json()); 
  }
  sent(searchText) {  
   let _request= {"search": searchText}
    return this.http.post(this.rootUrl+'listSent',_request,this.options)
      .map(res => res.json()); 
  }
  sentSearch(term){
    let _request= {"search": term}
    return this.http.post(this.rootUrl+'listSent',_request,this.options)
      .map(res => res.json()); 
  }
  viewMessages(messageId,viewType) {  
   let _request= {"viewType":viewType};
    return this.http.post(this.rootUrl+'getInboxMessageDetails/'+messageId,_request,this.options)
      .map(res => res.json()); 
  }

  file_Path:any;
    upload_new($event)
    {

    const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    //    const attachmnts = file.target.attachmnts || file.srcElement.attachmnts;
    // const filee = attachmnts[0];
       this.headers = new Headers();
    //this.headers.append('Content-Type',undefined);
    //this.headers.append('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY3LCJpc3MiOiJodHRwOlwvXC81Mi45MS4xNzQuNDo4MDk2XC9hcGlcL2xvZ2luIiwiaWF0IjoxNDk5ODQ4MzcwLCJleHAiOjE1MDA3MTIzNzAsIm5iZiI6MTQ5OTg0ODM3MCwianRpIjoiS1dkdlVNRnNHNVJMVjR1QyJ9.dD9L-HMTDVn9LGPmWLnQNh9WPkB9mmIwwCwd5YMGZtI');
    this.options = new RequestOptions({headers: this.headers});


     let fd = new FormData();
        //fd.append('file_name', name);
        fd.append('attachemts[0]', file);
        
        //let _request : {"attachemts":[{ "filename":FormData}]} = {"attachemts":[{ "filename":file}]}
return this.http.post(this.rootUrl+'attachFiles',fd,this.options)
.map(res => res.json());
    
}
    upload(formData, options)
    {
 
return this.http.post(this.rootUrl+'attachFiles',formData,options)
.map(res => res.json());
  
 
}
file:any;
  fileUploads(id,file){
    this.headers = new Headers();
    this.headers.append('Content-Type',undefined);
    this.options = new RequestOptions({headers: this.headers});
     let fd = new FormData();
        fd.append('file_name', name);
        fd.append('file_path', file);
        fd.append('name',"avatar");
        let send:{message:{attachments:[{file_name:FormData,file_path:ImageData}],to:{title:string,description:string,image:string,originalObject:{id:string,avatar:string,email:string,user_type:string,friend_name:string}},subject:string,message:string
    }} = {"message":{"attachments":[{"file_name":name,"file_path":file}],"to":{"title":"","description":"","image":"","originalObject":{"id":id,"avatar":"","email":"","user_type":"","friend_name":""}},"subject":"","message":"",
 }}
       return this.http.post(this.rootUrl+'sendMessage', send,this.options).map(res => res.json());

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
    let _request= {search: ""}
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
  }
  sentScroll(nextPageURL)
  {
    let _request= {search: ""}
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
  }
  deleteMessage(messageId,viewType)
  {
    let _request= {"viewType":viewType};
    return this.http.post(this.rootUrl+'deleteMessage/'+messageId,_request,this.options)
      .map(res => res.json());
  }
  deleteBulkMessages(messageId,viewType){

      let _request= {"viewType":viewType,"ids":messageId}
    return this.http.post(this.rootUrl+'deleteBulkMessage',_request,this.options)
      .map(res => res.json());

  }
}
