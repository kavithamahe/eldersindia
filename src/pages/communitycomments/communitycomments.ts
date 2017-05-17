import { Component } from '@angular/core';
import { ViewController ,LoadingController, AlertController,ToastController, NavController, NavParams, PopoverController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CommunityprofilePage } from '../communityprofile/communityprofile';
import { CommunityServices } from '../../providers/community-services';
import { EmojiPickerPage } from '../../pages/emoji-picker/emoji-picker';
/*
  Generated class for the Communitycomments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-communitycomments',
  templateUrl: 'communitycomments.html'
})
export class CommunitycommentsPage {
posts:any;
post_comments = [];
post_id:any;
post_profile_id:any;
reply_comment:any="";
Reply:any;
showReply:any;
replyBlock:any;
post_comment:any='';
imageUrl:any;
token:any;
user_id:any;


  constructor(public loadingCtrl: LoadingController, public nav: NavController, public viewCtrl: ViewController, public storage: Storage, public toastCtrl: ToastController, public alertCtrl:AlertController, public communityServices: CommunityServices, public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
  	 this.nav=nav;  
    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;
      	this.posts = navParams.get("posts");
      	this.post_comments = this.posts.comments;
      	this.post_id = this.posts.id;
      	this.post_profile_id = this.posts.profile_id;
  	
  		});
      storage.get('token').then((token) => { this.token=token; });
      storage.get('id').then((id) => { this.user_id=id; })
    });
  	
  }

  profileImage(id){

    this.navCtrl.push(CommunityprofilePage,{profile_uid:id});
  }
  
  showConfirm(DeleteId) {
    let confirm = this.alertCtrl.create({
     title:'Confirm',
     subTitle: 'comment will be deleted',
       buttons: [
        {
          text: 'Cancel',
         },
        {
          text: 'Ok',
          handler: () => {
           this.deleteComment(DeleteId);
          
          }
        }
      ]
    });
    confirm.present();
  }

  showComments(event){
    this.reply_comment="";
    this.Reply=null;
    this.replyBlock=null;
    if(this.showReply==event){
        this.showReply=null;
    }
    else{
      this.showReply=event;
    }
 }
 sendInlineLikes(comments_id){
     let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();

   this.communityServices.sendInlineLikes(comments_id).subscribe(data =>{
     this.showToast(data.result.info.message);
     
   },
    err =>{
    
    this.communityServices.showErrorToast(err);
  })
    
    loader.dismiss();
 }

 replyComments(event){
    this.reply_comment="";
    this.Reply=null;
    if(this.replyBlock==event){
        this.replyBlock=null;
    }
    else{
      this.replyBlock=event;
    }
 }
 reply(event){
    this.reply_comment="";
    this.replyBlock=null;
    if(this.Reply==event){
        this.Reply=null;
    }
    else{
      this.Reply=event;
    }
 }

  deleteComment(id){
     this.communityServices.deleteComment(id).subscribe(datas =>{
     this.showToast(datas.result);
     this.post_comment="";
     for(let i=0; i<this.post_comments.length;i++){
     	if(this.post_comments[i].comments_id == id){
     		
     		this.post_comments.splice(i,1);
          console.log("index of comment: ",i);
     	}
     }
     
     
     },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
  }
 
 
  showToast(messageData){
    let toast = this.toastCtrl.create({
        message: messageData,
        position:"top",
        duration: 3000
      });
      toast.present();
   }

sendComment(postID){
    if(this.post_comment != ""){

    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
     this.communityServices.sendPosts(postID,this.post_comment).subscribe(datas =>{

     this.post_comments.push(datas.result.info.list[0])
     this.showToast(datas.result.info.message);
     this.post_comment="";
 
     },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
     loader.dismiss();
   }else{
     this.showToast("Enter Comments and Post");
   }
     
  }

  sendReply(uid_from,comments_id){
     console.log("comment" + uid_from + comments_id);
      this.Reply=null;
      this.replyBlock=null;
    if(this.reply_comment != ""){

    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
     this.communityServices.sendReply(uid_from,comments_id,this.reply_comment).subscribe(datas =>{
     this.showToast(datas.result.info.message);
     this.reply_comment="";
     // this.communityList(this.community_id);
     for(let i=0; i<this.post_comments.length;i++){
     	if(this.post_comments[i].comments_id == comments_id){
     		console.log("index of comment: ",i);
     		// this.post_comments[i].comments=[];
     		let list = datas.result.info.list;
     		console.log(list);
     		this.post_comments[i].comment_reply.push({
     			com_post_cmt_id:list.com_post_cmt_id,
     			comments_replay:list.comments_replay,
     			comments_replay_id:list.comments_replay_id,
     			created_at:null,
     			name_from:list.name_from,
     			name_to:list.name_to,
     			profile_image:list.profile_image,
     			uid_from:list.uid_from,
     			uid_to:list.uid_to
     		});
     	}
     }
     },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
     loader.dismiss();
   }else{
     this.showToast("Enter Comments and Post");
   }
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunitycommentsPage');
  }

  dismiss(){
  	this.nav.pop();
  }
  emojiPicker1(post_id)
   {
    let  likeEmoji={type:'commentEmoji'};
   let modal = this.popoverCtrl.create(EmojiPickerPage,likeEmoji);
    modal.present();
     modal.onDidDismiss(data => {
      if(data!=null)
      {
      this.post_comment=this.post_comment+' '+data.emojiImage;
      this.sendComment(post_id);
      }
     })
   }
   emojiPicker2(commendId,postProfileId)
   {
     let  likeEmoji={type:'commentEmoji'};
   let modal = this.popoverCtrl.create(EmojiPickerPage,likeEmoji);
    modal.present();
     modal.onDidDismiss(data => {
      if(data!=null)
      {
      this.reply_comment=this.reply_comment+' '+data.emojiImage;
      this.sendReply(commendId,postProfileId);
      }
     })
   }  

}
