import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController,ModalController,LoadingController,ToastController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { BlogListService } from '../../providers/blog-list-service';
import { CommunityprofilePage } from '../../pages/communityprofile/communityprofile';
import { ShareBlogPagePage } from '../../pages/share-blog/share-blog';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import moment from 'moment';
/*
  Generated class for the Singleblog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-singleblog',
  templateUrl: 'singleblog.html',
  providers:[BlogListService]
})
export class SingleblogPage {
blogId:number;
id:any;
singleBlogInfo:{};
token:string;
imageUrl:string;
commandObj:any;
comment:any;
showComment:boolean = false;
viewCommentsList:any;
user_id:any;
Reply:any;
reply_comment:any="";
showReply:any;
replyPost:any;
commentForm: FormGroup;
submitAttempt: boolean = false;
communitylist:any=[];
allow_comment:any;
created_at:any;
connectionInfo:any=[];
rootUrl:any;
 
  constructor(public formBuilder: FormBuilder,public modalCtrl: ModalController, public navCtrl: NavController,public platform: Platform,public actionsheetCtrl: ActionSheetController, public navParams: NavParams,public blogListService:BlogListService,public storage:Storage,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    this.storage.ready().then(() => {
        storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      });
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('id').then((id) => { this.user_id=id;});
      storage.get('token').then((token) => { this.token=token; 
       this.blogId=navParams.get("blogId");
       this.allow_comment = navParams.get("allow_comment");
       this.created_at = moment(navParams.get("created_at")).format("DD MMM YYYY HH:mm:ss");
  		this.onInit(this.blogId);
      this.viewComments(this.blogId);
      })
  	});
    this.commentForm = formBuilder.group({

        comment: ['', Validators.compose([Validators.pattern("[a-zA-z0-9_-].*\\S.*"),Validators.required])]
         });
    this.showComment=true;

  }
  public leaveComment()
  {
   if(this.showComment)
    {
      if(document.getElementById('commentsView') != null){
        document.getElementById('commentsView').scrollIntoView();
      }
     
     }
    this.showComment=!this.showComment;
  }
  
  public onInit(blogId)
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogListService.singleBlog(blogId).subscribe(
     (singleBlog) => {
      this.singleBlogInfo=singleBlog.result.details;  
      this.communitylist=singleBlog.result.community_list;
      loader.dismiss();   
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      });
  }
  shareblog(id){ 
        let modal = this.modalCtrl.create(ShareBlogPagePage,{blogID:id,communitylists:this.communitylist});
    modal.present();
  }
  openMenu(id) {
    let actionSheet = this.actionsheetCtrl.create({
      title: '',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.deleteComment(id);
          }
        },
      
      ]
    });
    actionSheet.present();
  }
 public deleteComment(commentId)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogListService.deleteComment(commentId).subscribe(
     (deleteComment) => {
       this.viewComments(this.blogId);
     this.showToaster(deleteComment.result);  
      loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
         loader.dismiss();
      }
    );   
  }
  public deletereplyComment(commentId)
  {
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogListService.deleteReplyComment(commentId).subscribe(
     (deleteComment) => {
       this.viewComments(this.blogId);
     this.showToaster(deleteComment.result);  
      loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
         loader.dismiss();
      }
    );   
  }
  public blogComment(blogId)
  {
    if(!this.commentForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
      this.comment = this.commentForm.value.comment; 

  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.commandObj={"comment":this.comment};
    this.blogListService.blogComment(blogId,this.commandObj).subscribe(
     (blogComment) => {
       this.viewComments(this.blogId);
       this.commentForm.reset();
     this.showToaster(blogComment.result);  
     loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );   
   }
  }
  public viewComments(blogId)
  {
    this.blogListService.viewComments(blogId).subscribe(
     (viewComments) => {
      this.viewCommentsList=viewComments.result;     
    },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
      }
    );
    
  }
  
  public showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
   viewReply(event){
     this.reply_comment="";
      this.replyPost=null;
    if(this.showReply==event){
        this.showReply=null;
    }
    else{
      this.showReply=event;
    }
 }
 replyblogPost(event){
  console.log(event);
  console.log(this.showReply);
   console.log(this.replyPost);
   this.reply_comment="";
   this.showReply=null;
    if(this.replyPost==event){
        this.replyPost=null;
    }
    else{
      this.replyPost=event;
    }
 }
 postReply(commentId,to_id){
    if(this.reply_comment != ""){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.blogListService.postReply(commentId,to_id,this.reply_comment).subscribe(
     (postComment) => {
      this.viewComments(this.blogId);
     this.showToaster(postComment.result.info.message);
     this.reply_comment='';
    this.replyPost=null;  
    this.showReply=null;
     loader.dismiss();
    },
    (err) => { 
        if(err.status===401)
        {
         this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );
 }
 else{
     this.showToaster("Enter Comments and Post");
   }
}

  public CommunityUserWall(profile_uid)
  {
    this.navCtrl.push(CommunityprofilePage,{profile_uid});

  } 
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
}
