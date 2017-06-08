import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { AppConfig } from '../providers/app-config';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';


@Injectable()
export class CommunityServices {
  headers:any;
  options:any;
  imageUrl:any;
  body : any;
  post:any;
  detail:any;
  delete:any;
  lists:any;
  manage:any;
  edit:any;
  add:any;
  posts:any;
  join:any;
  connect:any;
  connectlist:any;
  send:any;
  token:any;
  //id:number;
  user_id:number = 0;
  getCommunityPostsUrl:any;
   constructor(private transfer: Transfer, private filePath: FilePath,public appConfig:AppConfig,public http: Http,public storage:Storage,public toastCtrl: ToastController) {
     this.getCommunityPostsUrl = appConfig.setrooturl();
    this.storage.ready().then(() => {
    storage.get('token').then((token) => { this.token=token;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
    this.options = new RequestOptions({ headers: this.headers });
    })    
    storage.get('rooturl').then((rooturl) => { this.getCommunityPostsUrl=rooturl; });
    storage.get('id').then((id) => { this.user_id=id; })
    
   }); 
  }

  fileTransferIonic(uri){
     const fileTransfer: TransferObject = this.transfer.create();


    // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
      let options1: FileUploadOptions = {
         fileKey: 'file',
         fileName: 'avatar.png',
         // headers: this.options,
         params: {"app_key":"Testappkey","name":"saravanan","dob":"09-04-1995", "mobile":"9566631107"},
         chunkedMode : false
      
      }

      fileTransfer.upload(uri, encodeURI('http://192.168.1.200:8095/fileup/fileupload.php'), options1)
       .then((data) => {
       // success
       console.log(data);
       alert("success"+JSON.stringify(data));
       }, (err) => {
       // error
       console.log(err);
       alert("error"+JSON.stringify(err));
           });
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

  fileTransfer.upload(imageData, 'http://192.168.1.200:8095/fileup/fileupload.php', options1)
   .then((data) => {
     // success
     alert("success");
   }, (err) => {
     // error
     alert("error"+JSON.stringify(err));
   });
 
}
  initialize(){
    this.storage.ready().then(() => {
    this.storage.get('token').then((token) => { this.token=token;
      })    
    this.storage.get('rooturl').then((rooturl) => { this.getCommunityPostsUrl=rooturl; });
    this.storage.get('id').then((id) => { this.user_id=id; })
    
   }); 
  }

  fileUpload(id,file){
 let formdata = new FormData()
 let posts:{community_id:string,image:File,videourl:string,message:string} = { community_id:id, image:file,videourl:"",message:"" }
     return this.http.post(`${this.getCommunityPostsUrl }addCommunityPost`,posts,this.options)
      .map(res =>res.json());
  }

  showToast(messageData){
    let toast = this.toastCtrl.create({
        message: messageData,
        position:"top",
        duration: 3000
      });
      toast.present();
   }

  showErrorToast(error){
    if(error.status===401){
      this.showToast(JSON.parse(error._body).error);
    }
    else{
      this.showToast("Please try again later");
    }
  }

myCommunity(data){
  this.body = {"uid": this.user_id, "search": data, "view": "grid", "get": ["communityCategory"]}

     return this.http.post(`${this.getCommunityPostsUrl }myCommunity`,this.body,this.options)
      .map(res =>res.json());
}
 eventsscroll(nextPageURL) 
   {  
  this.body= {"uid": this.user_id, "search": "", "view": "grid", "get": ["communityCategory"]}
    return this.http.post(nextPageURL,this.body,this.options)
      .map(res => res.json()); 
   }

getCommunity(category){
  this.body = {"uid": this.user_id, "search": "","s_category": category,  "view": "grid", "get": ["communityCategory"]}

     return this.http.post(`${this.getCommunityPostsUrl }myCommunity`,this.body,this.options)
      .map(res =>res.json());
}

recommendedCommunity(data){
   this.body = {"uid": this.user_id, "search": data, "view": "grid", "get": ["communityCategory"]}

     return this.http.post(`${this.getCommunityPostsUrl }searchCommunity`,this.body,this.options)
      .map(res =>res.json());
}
setCategory(category){
   this.body = {"uid": this.user_id, "search": "","s_category": category,"view": "grid", "get": ["communityCategory"]}

     return this.http.post(`${this.getCommunityPostsUrl }searchCommunity`,this.body,this.options)
      .map(res =>res.json());
}

communityDetail(id1){
return this.http.post(`${this.getCommunityPostsUrl }getCommunityDetail`,{"info": {"community": id1, "uid": this.user_id}}
,this.options)
     .map(res => res.json());
}
joinCommunity(id){
  this.join ={"info":{"uid":this.user_id,"community":id}}
   return this.http.post(`${this.getCommunityPostsUrl }joinCommunity`,this.join,this.options)
      .map(res =>res.json());

}
//------ need to update----------//
connectMember(id,name){
   this.connect ={"connect_id":id,"connect_name":name}
   return this.http.post(`${this.getCommunityPostsUrl }sendConnectionRequest`,this.connect,this.options)
      .map(res =>res.json());
}
//------------//

getConnectLists(id,data){
   this.connectlist = {"id":id,"searchValue":data}
   return this.http.post(`${this.getCommunityPostsUrl }getConnectionList`,this.connectlist,this.options)
      .map(res =>res.json());
}
connectionscroll(nextPageURL,id){
  this.connectlist = {"id":id,"searchValue":""}
   return this.http.post(nextPageURL,this.connectlist,this.options)
      .map(res =>res.json());
}

getCommunityMembers(id){
  this.post={"user_id": id}
    return this.http.post(`${this.getCommunityPostsUrl }getCommunityMembers`,this.post,this.options)
      .map(res =>res.json());
}
communitydetailscroll(nextPageURL,id){
   this.post={"user_id": id}
    return this.http.post(nextPageURL,this.post,this.options)
      .map(res =>res.json());
}

myprofile(id){
    this.send = {"user_id":id}


   return this.http.post(`${this.getCommunityPostsUrl }myprofile`,this.send,this.options)
      .map(res =>res.json());
}
 
 getPrivacy(id){
    this.send = {"user_id":id}


   return this.http.post(`${this.getCommunityPostsUrl }getPrivacy`,this.send,this.options)
      .map(res =>res.json());
}
 
 sendMessage(id,attachment,subject,message){
    this.send = {"message":{"attachments":[],"to":{"title":"","description":"","image":"","originalObject":{"id":id,"avatar":"","email":"","user_type":"","friend_name":""}},"subject":subject,"message":message}}

   return this.http.post(`${this.getCommunityPostsUrl }sendMessage`,this.send,this.options)
      .map(res =>res.json());
}
 
 //-------------------------------//


  getCommunityPost(id){
    
  
    return this.http.post(`${this.getCommunityPostsUrl }getCommunityPosts`,{"info": {"community": id, "post": 0, "comPostId": ""}},this.options)
     .map(res => res.json());
     }
  communityscroll(nextPageURL,id){
        return this.http.post(nextPageURL,{"info": {"community": id, "post": 0, "comPostId": ""}},this.options)
     .map(res => res.json());
     }
     

  userProfile(id){
    this.body = {"user_id":id,"post":0}

     return this.http.post(`${this.getCommunityPostsUrl }getUserPosts`,this.body,this.options)
      .map(res =>res.json());
  }
  userpostsscroll(nextPageURL,id){
     this.body = {"user_id":id,"post":0}

     return this.http.post(nextPageURL,this.body,this.options)
      .map(res =>res.json());
  }

  //---------------------------------//



  addUserPosts(id,image,videoUrl,posts,links){
     this.posts = { "user_id":id, "image":image,"videourl":videoUrl,"message":posts,"metalink":links,"app":'' }


     return this.http.post(`${this.getCommunityPostsUrl }addUserPost`,this.posts,this.options)
      .map(res =>res.json());
  }
  memberProfileData(id){
    this.body = {"user_id":id}


     return this.http.post(`${this.getCommunityPostsUrl }getProfileDetail`,this.body,this.options)
      .map(res =>res.json());
  }


  

  addLike(likeObj){
   // this.body = {"info": {"postId":id}};
    this.body = {info: {postId: likeObj.id, emojiArr: {id: likeObj.emojiId, emoji: likeObj.emoji, name:likeObj.name}}};
    return this.http.post(`${this.getCommunityPostsUrl }sendLikes`,this.body,this.options)
      .map(res =>res.json());
  }
  sendInlineLikes(comments_id){
     this.body = {comPostCmtsId: comments_id}
    return this.http.post(`${this.getCommunityPostsUrl }sendInlineLikes`,this.body,this.options)
      .map(res =>res.json());
  }

   sendPosts(id1,comments){
     
    this.post = {"info": {"postId": id1, "comments": comments}}

     return this.http.post(`${this.getCommunityPostsUrl }sendComments`,this.post,this.options)
      .map(res =>res.json());
  }
  sendReply(uid_from,comments_id,comments){
    this.post = {"info":{"comments":comments,"uid_from":this.user_id,"uid_to":uid_from,"comment_id":comments_id}}

     return this.http.post(`${this.getCommunityPostsUrl }sendReply`,this.post,this.options)
      .map(res =>res.json());
  }


  postCommunity(id,image,videoUrl,posts,links){
     this.posts = { "community_id":id, "image":image,"videourl":videoUrl,"message":posts,"metalink":links, "app":'' }

     return this.http.post(`${this.getCommunityPostsUrl }addCommunityPost`,this.posts,this.options)
      .map(res =>res.json());
  }

 deleteComment(id){
   this.delete={"info": {"comment_id": id}}
   return this.http.post(`${this.getCommunityPostsUrl }removeFeedComment`,this.delete,this.options)
   .map(res =>res.json());
 }
 deletePost(id){
   this.delete={info: {post_id: id}}
   return this.http.post(`${this.getCommunityPostsUrl }removeFeedpost`,this.delete,this.options)
   .map(res =>res.json());
 }
 manageLists(){
    this.lists={"searchValue":""}
      
    return this.http.post(`${this.getCommunityPostsUrl }getElderListBySponser`,this.lists,this.options)
    .map(res =>res.json());
  }
   searchManageLists(data){
    this.lists={"searchValue":data}
      
    return this.http.post(`${this.getCommunityPostsUrl }getElderListBySponser`,this.lists,this.options)
    .map(res =>res.json());
  }

  getElder(elder_id){
    let elderData = {"elderId":elder_id};
    return this.http.post(`${this.getCommunityPostsUrl }getElderListById`,elderData,this.options)
    .map(res =>res.json());
  }

  getElderMasterDetails(){
   this. body = {"get":["Relations","InService","FunctionalArea","Educational","Specialization","Locations","AreaofInterest","Skills"]};
     return this.http.post(`${this.getCommunityPostsUrl }getElderMasterDetails`,this.body,this.options)
    .map(res =>res.json());
  }

  deleteDetail(id){
    this.manage={"info":{"id":id}}
    return this.http.post(`${this.getCommunityPostsUrl }elderDelete`,this.manage,this.options)
    .map(res =>res.json());
  }


  editSubmit(editedDependentData){
    return this.http.post(`${this.getCommunityPostsUrl }elderEdit`,editedDependentData,this.options)
    .map(res =>res.json());

  }
  
  addSubmit(dependentData){

   return this.http.post(`${this.getCommunityPostsUrl }elderOnBoarding`,dependentData,this.options)
    .map(res =>res.json());
  }
    
}