import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
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
  constructor(public http: Http,private transfer: FileTransfer,private filePath: FilePath,public storage:Storage) {
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

 jobsList(searchText,functionalArea,location) 
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
   let _request= {"search":{"location":this.locationSearch,"functional_area":this.functionalSearch},"get":["FunctionalArea","Location","SkillSet"],"info":{"q":searchText,"uid":this.user_id}};
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
    return this.http.post(this.rootUrl+'getJobById/'+jobId,_request,this.options)
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
    applyjobelder(dependent,user_id,jobId,file_name,file_path) 
 {
  let _request= {"info":{"job_id":jobId,"uid":user_id,"dependantId":dependent,"file_name":file_name,"file_path":file_path}};

     return this.http.post(this.rootUrl+'applyJob',_request,this.options)
      .map(res => res.json()); 
  }
  checkDependent(user_id,dependent,jobId){
     let _request= {"elderId": dependent,
                "jobId": jobId,
                "userId": user_id};

     return this.http.post(this.rootUrl+'getJobAvailAlert',_request,this.options)

      .map(res => res.json()); 
  }
  appliedJobs(searchText,functionalArea,location) 
  {
  if(functionalArea!='' && functionalArea!=null)
   {
     this.functionalSearch=functionalArea;
   } 
   if(location!='' && location!=null)
   {
     this.locationSearch=location;
   }
   let _request= {"search":{"location":this.locationSearch,"functional_area":this.functionalSearch},"get":["FunctionalArea","Location","SkillSet"],"info":{"uid":this.user_id,"q":searchText}};
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
  JobBoardscroll(nextPageURL,searchText,functionalArea,location)
   {  
   if(functionalArea!='' && functionalArea!=null)
   {
     this.functionalSearch=[functionalArea];
   } 
   if(location!='' && location!=null)
   {
     this.locationSearch=[location];
   }
   let _request= {"search":{"location":this.locationSearch,"functional_area":this.functionalSearch},"get":["FunctionalArea","Location","SkillSet"],"info":{"q":searchText,"uid":this.user_id}};
    
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
   appliedJobscroll(nextPageURL,searchText,functionalArea,location)
   {
     let _request= {"search":{"location":this.locationSearch,"functional_area":this.functionalSearch},"get":["FunctionalArea","Location","SkillSet"],"info":{"uid":this.user_id,"q":searchText}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
}
