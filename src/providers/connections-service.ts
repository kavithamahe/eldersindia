import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConnectionsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConnectionsService {
headers;
token:string;
options:any;
rootUrl:any;
user_id:any;
  constructor(public http: Http,public storage:Storage) {
   this.storage.ready().then(() => {
     storage.get('id').then((id) => { this.user_id=id;
       });
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
     })    
   
     storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; });
   });
  }
  
  allConnections() 
  {
   let _request= {"user_id":this.user_id,"searchValue":""};
    return this.http.post(this.rootUrl+'getConnectionList',_request,this.options)
      .map(res => res.json()); 
  }
  receivedRquest() {  
   let _request= {"searchValue":""};
    return this.http.post(this.rootUrl+'receiveConnectionRequest',_request,this.options)
      .map(res => res.json()); 
  }
  connectionStatus(connectionId,status) {  
   let _request= {"conn_req__id":connectionId,"approve_status":status};
    return this.http.post(this.rootUrl+'sendResponse',_request,this.options)
      .map(res => res.json()); 
  }
  searchConnection(term) {  
   let _request= {"user_id":this.user_id,"searchValue":term};
    return this.http.post(this.rootUrl+'getConnectionList',_request,this.options)
      .map(res => res.json()); 
  }
  infiniteRquest(nextURL) {  
   let _request= {"searchValue":""};
    return this.http.post(nextURL,_request,this.options)
      .map(res => res.json()); 
  }
}
