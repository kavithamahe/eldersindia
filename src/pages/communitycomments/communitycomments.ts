import { Component } from '@angular/core';
import { ViewController,ActionSheetController,Platform,LoadingController, AlertController,ToastController, NavController, NavParams, PopoverController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CommunityprofilePage } from '../communityprofile/communityprofile';
import { CommunityServices } from '../../providers/community-services';
import { EmojiPickerPage } from '../../pages/emoji-picker/emoji-picker';

import moment from 'moment';
/*
  Generated class for the Communitycomments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-communitycomments',
  templateUrl: 'communitycomments.html',
   providers : [CommunityServices]
})
export class CommunitycommentsPage {
posts:any;
post_comments = [];
comment_reply: any =[];
post_id:any;
post_profile_id:any;
reply_comment:any="";
Reply:any;
showReply:any;
replyBlock:any;
addBlock:any;
post_comment:any='';
imageUrl:any;
token:any;
user_id:any;
senddata:any;
post_likes:any;
send_post_comment:any='';
community_id:any;
created_at:any;
  constructor(public platform: Platform,public loadingCtrl: LoadingController,public actionsheetCtrl: ActionSheetController, public viewCtrl: ViewController, public storage: Storage, public toastCtrl: ToastController, public alertCtrl:AlertController, public communityServices: CommunityServices, public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
  	this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      this.posts = navParams.get("posts");
      this.post_comments = this.posts.comments;
      console.log(this.post_comments);
        // this.created_at = moment(this.post_comments.created_at).format("DD MMM YYYY HH:mm:ss");
        this.post_likes = this.posts.comments.likes;
        this.post_id = this.posts.id;
        this.post_profile_id = this.posts.profile_id;
        this.community_id = this.posts.com_id;
    });
      storage.get('id').then((id) => { this.user_id=id; })
    });
  	
  }

  profileImage(id){

    this.navCtrl.push(CommunityprofilePage,{profile_uid:id});
  }
  myImage(id){
    this.profileImage(id);
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
           this.showConfirm(id);
          }
        },
      
      ]
    });
    actionSheet.present();
  }
    showConfirm(replyId){
     let confirm = this.alertCtrl.create({
     subTitle: 'This comment will be deleted',
       buttons: [
        {
          text: 'Cancel',
         },
        {
          text: 'Ok',
          handler: () => {
           this.deleteComment(replyId);
          
          }
        }
      ]
    });
    confirm.present();
  }
   showConfirmreply(comment_id,reply_id,post_id){
     let confirm = this.alertCtrl.create({
     subTitle: '1 comment will be deleted',
       buttons: [
        {
          text: 'Cancel',
         },
        {
          text: 'Ok',
          handler: () => {
           this.deleteReply(comment_id,reply_id,post_id);
          
          }
        }
      ]
    });
    confirm.present();
  }
  openReplyMenu(comment_id,reply_id,post_id){
    let actionSheet = this.actionsheetCtrl.create({
      title: '',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
           this.showConfirmreply(comment_id,reply_id,post_id);
          }
        },
      
      ]
    });
    actionSheet.present();
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
 sendInlineLikescmt(id){
   this.communityServices.sendInlineLikes(id).subscribe(data =>{
           
           //this.showToast(data.result.info.message);
            for(let i=0; i<this.post_comments.length;i++){
       if(this.post_comments[i].comments_id == id){
         
         this.post_comments[i].likes = data.result.info.data;
       }
     }
       },
    err =>{
    this.communityServices.showErrorToast(err);
  })    
    
 }
 sendInlineLikes(reply_id,comments_id,post_id){
   this.communityServices.sendInlineLikes(reply_id).subscribe(data =>{
           
           //this.showToast(data.result.info.message);
            for(let i=0; i<this.post_comments.length;i++)
                {
                    if(this.post_comments[i].comments_id == comments_id)
                    {
                        for(let j=0; j<this.post_comments[i].comment_reply.length;j++)
                        {
                            if(this.post_comments[i].comment_reply[j].comments_replay_id == reply_id)
                            {
                               this.post_comments[i].comment_reply[j].likes = data.result.info.data
                            }
                        }
                        
                    }
                 }
       },
    err =>{
    this.communityServices.showErrorToast(err);
  })
    
   
 }
 addComments(event){
    if(this.addBlock==event){
        this.addBlock=null;
    }
    else{
      this.addBlock=event;
    }
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
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this.communityServices.deleteComment(id).subscribe(datas =>{
     //this.showToast(datas.result);
     this.post_comment="";
     for(let i=0; i<this.post_comments.length;i++){
     	if(this.post_comments[i].comments_id == id){
     		
     		this.post_comments.splice(i,1);
     	}
     }
      
      loader.dismiss();
     },
     err =>{
     loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
  }
 

deleteReply(comment_id,reply_id,post_id)
{
  let loader = this.loadingCtrl.create({ content: "Please wait..." });
  loader.present();
 this.communityServices.deleteComment(reply_id).subscribe(
    datas =>{
             //this.showToast(datas.result);
                 for(let i=0; i<this.post_comments.length;i++)
                {
                    if(this.post_comments[i].comments_id == comment_id)
                    {
                        for(let j=0; j<this.post_comments[i].comment_reply.length;j++)
                        {
                            if(this.post_comments[i].comment_reply[j].comments_replay_id == reply_id)
                            {
                                this.post_comments[i].comment_reply.splice(j,1);
                            }
                        }
                        
                    }
                 }
                  loader.dismiss();
            },
     err =>{
              loader.dismiss();
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
    if(this.send_post_comment != "" || this.post_comment != ""){
     if(this.send_post_comment == ""){
     this.send_post_comment=this.post_comment;
   }
    // let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    // loader.present();
     this.communityServices.sendPosts(postID,this.send_post_comment).subscribe(datas =>{

     this.post_comments.push(datas.result.info.list[0])
     //this.showToast(datas.result.info.message);
     this.post_comment="";
     this.send_post_comment="";
     //loader.dismiss();
     },
     err =>{
    //loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
     
   }else{
     this.showToast("Enter Comments and Post");
   }
     
  }

  sendReply(uid_from,comments_id){
      this.Reply=null;
      this.replyBlock=null;
    if(this.reply_comment != ""){

    // let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    // loader.present();
     this.communityServices.sendReply(uid_from,this.post_id,comments_id,this.reply_comment).subscribe(datas =>{
    this.showToast(datas.result.info.message);
     this.reply_comment="";
     for(let i=0; i<this.post_comments.length;i++){
     	if(this.post_comments[i].comments_id == comments_id){
     		let list = datas.result.info.list;
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
    // loader.dismiss();
     },
     err =>{
    //loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
     
   }else{
     this.showToast("Enter Comments and Post");
   }
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunitycommentsPage');
  }

  dismiss(){
  	this.viewCtrl.dismiss({community_id:this.community_id});
  }
  clearInputText(){
  }
  emojiPicker1(ev,post_id)
   {
    
    let  likeEmoji={type:'commentEmoji'};
   let popover = this.popoverCtrl.create(EmojiPickerPage,likeEmoji);
    popover.present({
      ev: ev
    });
     popover.onDidDismiss(data => {
      if(data!=null)
      {
      this.send_post_comment=this.post_comment+' '+data.emojiImage;
      this.sendComment(post_id);
      }
     })
   }
   emojiPicker2(ev,commendId,postProfileId)
   {
     let  likeEmoji={type:'commentEmoji'};
   let popover = this.popoverCtrl.create(EmojiPickerPage,likeEmoji);
    popover.present({
      ev: ev
    });
     popover.onDidDismiss(data => {
      if(data!=null)
      {
      this.reply_comment=this.reply_comment+' '+data.emojiImage;
      this.sendReply(commendId,postProfileId);
      }
     })
   }  

}
