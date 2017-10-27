import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

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
functionalSearch:any=[];
locationSearch:any=[];
  constructor(public http: Http,private transfer: Transfer,private filePath: FilePath,public storage:Storage) {
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

 jobsList(functionalArea,location) 
 {

   console.log("-------------");
    console.log(this.headers);
   if(functionalArea!='' && functionalArea!=null)
   {
     this.functionalSearch=functionalArea;
   } 
   if(location!='' && location!=null)
   {
     this.locationSearch=location;
   }
   let _request= {"search":{"location":this.locationSearch,"functional_area":this.functionalSearch},"get":["FunctionalArea","Location","SkillSet"],"info":{"q":"","uid":this.user_id}};
    return this.http.post(this.rootUrl+'getJobList',_request,this.options)
      .map(res => res.json()); 
  }
 singleJob(jobId) 
 {
  
   let _request= {"info":{"uid":this.user_id}};
    return this.http.post(this.rootUrl+'getJobById/'+jobId,_request,this.options)
      .map(res => res.json()); 
  }
  myjobrequest(jobId){
    let _request= {"info":{"uid":this.user_id}};
    return this.http.post(this.rootUrl+'myJobRequestById/'+jobId,_request,this.options)
      .map(res => res.json());
  }

resumeupload(formData, options){
  return this.http.post(this.rootUrl+'attachResume',formData,options)
.map(res => res.json());
}
  applyJob(jobId,dependantId,applyJob) 
 {
  
   let _request= {"info":{"job_id":jobId,"uid":this.user_id,"dependantId":dependantId,"filename":applyJob}};  
    return this.http.post(this.rootUrl+'applyJob',_request,this.options)
      .map(res => res.json()); 
  }
    applyjobelder(jobData) 
 {
  // let body=new FormData();
  // console.log(body);
  // body.append('job_id',jobId);
  // body.append('uid',user_id);
  // body.append('dependantId',dependantId);
  // body.append('file_name',file_name);
  // body.append('file_path',file_path);

  //   let headers = new Headers();
  //    headers.append("Content-Type","application/formdata");
  //     //let _request={"info":body};
     return this.http.post(this.rootUrl+'applyJob',jobData,this.options)
      .map(res => res.json()); 
  }
  appliedJobs(functionalArea,location) 
  {
  if(functionalArea!='' && functionalArea!=null)
   {
     this.functionalSearch=functionalArea;
   } 
   if(location!='' && location!=null)
   {
     this.locationSearch=location;
   }
   let _request= {"search":{"location":this.locationSearch,"functional_area":this.functionalSearch},"get":["FunctionalArea","Location","SkillSet"],"info":{"uid":this.user_id,"q":""}};
     return this.http.post(this.rootUrl+'myJobRequests',_request,this.options)
      .map(res => res.json()); 
 
  }
   searchConnection(term) {  
   let _request= {"search":term,"info":{"uid":this.user_id}};
    return this.http.post(this.rootUrl+'myJobRequests',_request,this.options)
      .map(res => res.json()); 
  }
  getDependent() 
  {
  
   let _request= {};
    return this.http.post(this.rootUrl+'getDependants',_request,this.options)
      .map(res => res.json()); 
  }
  JobBoardscroll(nextPageURL,functionalArea,location)
   {  
   if(functionalArea!='' && functionalArea!=null)
   {
     this.functionalSearch=[functionalArea];
   } 
   if(location!='' && location!=null)
   {
     this.locationSearch=[location];
   }
   let _request= {"search":{"location":this.locationSearch,"functional_area":this.functionalSearch},"get":["FunctionalArea","Location","SkillSet"],"info":{"uid":this.user_id}};
    
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
