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
  inbox(data) {  
   let _request= {search: ""}
    return this.http.post(this.rootUrl+'listInbox',_request,this.options)
      .map(res => res.json()); 
  }
  sent() {  
   let _request= {search: ""}
    return this.http.post(this.rootUrl+'listSent',_request,this.options)
      .map(res => res.json()); 
  }
  viewMessages(messageId,viewType) {  
   let _request= {"viewType":viewType};
    return this.http.post(this.rootUrl+'getInboxMessageDetails/'+messageId,_request,this.options)
      .map(res => res.json()); 
  }
  
  file_Path:any;
    upload(imageData)
    {
      
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:

     const fileTransfer: TransferObject = this.transfer.create();

    this.filePath.resolveNativePath(imageData)
     .then(filePath => {
                console.log(filePath);
                this.file_Path = filePath;
            });

      let file_name = this.file_Path.split("/").pop();

      let options1: FileUploadOptions = {
         fileKey: 'file',
         fileName: file_name,
         headers: {}
      
      }
      
  fileTransfer.upload(imageData, this.rootUrl+'sendMessage',options1)
   .then((data) => {
     // success
     alert("success");
   }, (err) => {
     // error
     alert("error"+JSON.stringify(err));
   });
 
}
file:any;
  fileUploads(id,file){
    this.headers = new Headers();
    this.headers.append('Content-Type',undefined);
    //this.headers.append('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMSwiaXNzIjoiaHR0cDpcL1wvMTgzLjgyLjMzLjIzMjo4MDk3XC9hcGlcL2xvZ2luIiwiaWF0IjoxNDk2MzE0ODMyLCJleHAiOjE0OTcxNzg4MzIsIm5iZiI6MTQ5NjMxNDgzMiwianRpIjoiREI3cVloa2Zva3k4OUk2SiJ9.ZGZUZaNUDMONtvL2kes4SqSsu-JvLYhJYX4EU3WL0aE');
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
}
