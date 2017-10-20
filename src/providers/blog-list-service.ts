import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
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
BlogId:any;
friendsID:any;
Url:any;
  constructor(public http: Http, public storage:Storage,public toastCtrl: ToastController) {
    this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
       })    
    storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      console.log(this.rootUrl);
      });
     storage.get('id').then((id) => { this.user_id=id; })
   });
  }
  
  blogList(searchCategory,searchText) {  
   let _request= {search: {"title": searchText, "category": searchCategory}};
    return this.http.post(this.rootUrl+`normaListBlog`,_request,this.options)
      .map(res => res.json()); 
  }
 
  searchConnection(term) {  
   let _request= {"search":{"title":term}};
    return this.http.post(this.rootUrl+'normaListBlog',_request,this.options)
      .map(res => res.json()); 
  }
  searchCategory(searchCategory) {  
   let _request= {"search":{"title":"","category": searchCategory}};
    return this.http.post(this.rootUrl+'normaListBlog',_request,this.options)
      .map(res => res.json()); 
  }
  getBlogCategories(){
     let _request= {};
    return this.http.post(this.rootUrl+'getBlogCategories',_request,this.options)
      .map(res => res.json());
  }
  
eventsscroll(searchCategory,searchText,nextPageURL) 
   {  
   let _request= {search: {"title": searchText, "category": searchCategory}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }

  singleBlog(blogId) {  
   let _request= {};
    return this.http.post(this.rootUrl+'getBlogDetails/'+blogId,_request,this.options)
      .map(res => res.json()); 
  }
getPackageRequest(Url,searchText,packstatus){
  //console.log(Url);
       let _request= {info: {"list": true, "search": searchText, "status": packstatus, "token": null}};
    return this.http.post(Url+`getPackageRequest`,_request,this.options)
      .map(res => res.json()); 
}
eventscrolls(nextPageURL,searchText,packstatus) 
   {  
   let _request= {info: {"list": true, "search": searchText, "status": packstatus, "token": null}};

    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
getPackageRequestById(rootUrl,packageId){
     let _request= {"id":packageId};
    return this.http.post(rootUrl+'getPackageRequestById',_request,this.options)
      .map(res => res.json());
  }
  getServicesForByElders(rootUrl,packageId,elder,location_id){
       let _request= {"pack_id": packageId, "elder": elder, "location_id": location_id}
    return this.http.post(rootUrl+'getServicesForByElders',_request,this.options)
      .map(res => res.json());
  }
   getVendorpackageDetails(rootUrl,vendor_id,location_id){
    if(location_id == undefined || location_id == ''){
      location_id= 'null';
    }
    let _request= {"vendor_id": vendor_id, "location_id": location_id}
    return this.http.post(rootUrl+'getVendorpackageDetails',_request,this.options)
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
  createBlog(blogObject,actionUrl)
  {
    let _request= blogObject;
    return this.http.post(this.rootUrl+actionUrl,_request,this.options)
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
   let _request= {"search":{"title":"","status":"","category":"","posted_by":"others","author":this.user_id}};
    return this.http.post(this.rootUrl+'listBlog',_request,this.options)
      .map(res => res.json()); 
  }
  deleteBlog(blogId) {  
   let _request= {"info":{"id":blogId}};
    return this.http.post(this.rootUrl+'deleteBlog',_request,this.options)
      .map(res => res.json()); 
  }
  manageBlogscroll(nextPageURL)
   {
   let _request= {"search":{"title":"","status":"","category":"","posted_by":"others","author":this.user_id}};
    return this.http.post(nextPageURL,_request,this.options)
      .map(res => res.json()); 
   }
   getEditBlog(blogId)
   {   
      let _request= {};
    return this.http.post(this.rootUrl+'getBlog/'+blogId,_request,this.options)
      .map(res => res.json());      
   }
   getConnections(rootUrl){
       let _request= {};
       console.log(this.rootUrl+'getConnections');
    return this.http.post(this.rootUrl+'getConnections',_request,this.options)
      .map(res => res.json()); 
   }

   shareBlog(BlogId,friendsID){
      let _request= {'friends':{'user_id':friendsID},'shareurl':this.rootUrl+'/#/blog/details/'+BlogId};
     //let _request={};
       console.log(_request);
     
    return this.http.post(this.rootUrl+'shareblog',_request,this.options)
      .map(res => res.json()); 
   }
   showErrorToast(error){
    if(error.status===401){
      this.showToast(JSON.parse(error._body).error);
    }
    else{
      this.showToast("Please try again later");
    }
  }
  showToast(messageData){
    let toast = this.toastCtrl.create({
        message: messageData,
        position:"top",
        duration: 1000,
        cssClass: "invalidvalue",
      });
      toast.present();
   }
}
