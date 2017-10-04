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
      
  fileTransfer.upload(imageData, this.rootUrl+'applyJob',options1)
   .then((data) => {
     // success
     alert("success");
   }, (err) => {
     // error
     alert("error"+JSON.stringify(err));
   });
 
}
  fileUploads(id,file){
    this.headers = new Headers();
    this.headers.append('Content-Type',undefined);
    //this.headers.append('Authorization','Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEwMSwiaXNzIjoiaHR0cDpcL1wvMTgzLjgyLjMzLjIzMjo4MDk3XC9hcGlcL2xvZ2luIiwiaWF0IjoxNDk2MzE0ODMyLCJleHAiOjE0OTcxNzg4MzIsIm5iZiI6MTQ5NjMxNDgzMiwianRpIjoiREI3cVloa2Zva3k4OUk2SiJ9.ZGZUZaNUDMONtvL2kes4SqSsu-JvLYhJYX4EU3WL0aE');
    this.options = new RequestOptions({headers: this.headers});


     let fd = new FormData();
        fd.append('file_name', name);
        fd.append('file_path', file);
        fd.append('name',"avatar");
        let _request:{"info":{"job_id":string,"uid":string,"dependantId":string,"filename":FormData}} 
        =   {"info":{"job_id":"","uid":"","dependantId":"","filename":name}};
       return this.http.post(this.rootUrl+'applyJob', _request,this.options).map(res => res.json());

  }

  applyJob(jobId,dependantId,applyJob) 
 {
  
   let _request= {"info":{"job_id":jobId,"uid":this.user_id,"dependantId":dependantId,"filename":applyJob}};  
    return this.http.post(this.rootUrl+'applyJob',_request,this.options)
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
