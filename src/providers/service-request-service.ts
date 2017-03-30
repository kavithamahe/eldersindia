import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceRequestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceRequestService {
headers;
token:string;
options:any;
rootUrl:any;
  constructor(public http: Http,public storage:Storage) {
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
  serviceRequestList() 
  {
  
   let _request= {"searchValue":"","status":""};
    return this.http.post(this.rootUrl+'serviceRequestList',_request,this.options)
      .map(res => res.json()); 
  }
  viewServiceRequest(serviceRequestId) 
  {
  
   let _request= {"id":serviceRequestId};
    return this.http.post(this.rootUrl+'serviceRequestListById',_request,this.options)
      .map(res => res.json()); 
  }
}
