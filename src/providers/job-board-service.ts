import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the JobBoardService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JobBoardService {
headers;
token:string;
options:any;
rootUrl:any;
user_id:number;
  constructor(public http: Http,public storage:Storage) {
   this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
   
   	storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; });
   	storage.get('id').then((id) => { this.user_id=id; });
   });
  }

 jobsList() 
 {
  
   let _request= {"search":{"location":[],"functional_area":[]},"get":["FunctionalArea","Location","SkillSet"],"info":{"uid":this.user_id}};
    return this.http.post(this.rootUrl+'getJobList',_request,this.options)
      .map(res => res.json()); 
  }
 singleJob(jobId) 
 {
  
   let _request= {"info":{"uid":this.user_id}};
    return this.http.post(this.rootUrl+'getJobById/'+jobId,_request,this.options)
      .map(res => res.json()); 
  }
 applyJob(jobId,dependantId) 
 {
  
   let _request= {"info":{"job_id":jobId,"uid":this.user_id,"dependantId":dependantId}};  
    return this.http.post(this.rootUrl+'applyJob',_request,this.options)
      .map(res => res.json()); 
  }
  appliedJobs() 
  {
  
   let _request= {"search":"","info":{"uid":this.user_id}};
    return this.http.post(this.rootUrl+'myJobRequests',_request,this.options)
      .map(res => res.json()); 
  }
  getDependent() 
  {
  
   let _request= {};
    return this.http.post(this.rootUrl+'getDependants',_request,this.options)
      .map(res => res.json()); 
  }
  JobBoardscroll(nextPageURL)
   {
    let _request= {"search":{"location":[],"functional_area":[]},"get":["FunctionalArea","Location","SkillSet"],"info":{"uid":this.user_id}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
   appliedJobscroll(nextPageURL)
   {
    let _request= {"search":"","info":{"uid":this.user_id}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
}
