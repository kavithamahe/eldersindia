import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
/*
  Generated class for the BlogListService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BlogListService {
headers;
token:string;
options:any;
rootUrl:any;
user_id:any;
  constructor(public http: Http, public storage:Storage) {
    this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; });
     storage.get('id').then((id) => { this.user_id=id; })
   });
  }
  
  blogList() {  
   let _request= {"search":{"title":""}};
    return this.http.post(this.rootUrl+`normaListBlog`,_request,this.options)
      .map(res => res.json()); 
  }

  singleBlog(blogId) {  
   let _request= {};
    return this.http.post(this.rootUrl+'getBlogDetails/'+blogId,_request,this.options)
      .map(res => res.json()); 
  }

  blogComment(blogId,commandObj) {  
    let _request=commandObj;
    return this.http.post(this.rootUrl+'postComments/'+blogId,_request,this.options)
      .map(res => res.json()); 
  }

  viewComments(blogId) {  
   let _request= {};
    return this.http.post(this.rootUrl+'getComments/'+blogId,_request,this.options)
      .map(res => res.json()); 
  }
  deleteComment(commentId) {  
   let _request= {"id":commentId};
    return this.http.post(this.rootUrl+'deleteComment',_request,this.options)
      .map(res => res.json()); 
  }
   postReply(commentId,to_id,comments) {  
   let _request= {info: {"comments": comments, "uid_from": this.user_id, "uid_to": to_id, "comment_id": commentId}}
    return this.http.post(this.rootUrl+'postReply',_request,this.options)
      .map(res => res.json()); 
  }
  createBlog(blogObject)
  {
    let _request= blogObject;
    return this.http.post(this.rootUrl+'addBlog',_request,this.options)
      .map(res => res.json());
  }
  getBlogCategory()
  {
    let _request= {};
    return this.http.post(this.rootUrl+'getBlogCategories',_request,this.options)
      .map(res => res.json());
  }
  getTagsList(tagsInput)
  {
   // let _request= {};
    return this.http.get(this.rootUrl+'getBlogTags/'+tagsInput,this.options)
      .map(res => res.json());
  }
  manageblogs() {  
   let _request= {"search":{"title":"","status":"","category":"","posted_by":"others","author":"10"}};
    return this.http.post(this.rootUrl+'listBlog',_request,this.options)
      .map(res => res.json()); 
  }
}
