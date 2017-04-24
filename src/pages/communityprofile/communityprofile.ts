import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController,AlertController,LoadingController,PopoverController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import { EmojiPickerPage } from '../../pages/emoji-picker/emoji-picker';




import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunitymessagePage } from '../communitymessage/communitymessage';
import { CommunitycommentsPage } from '../communitycomments/communitycomments';

import { MyprofilesettingPage } from '../myprofilesetting/myprofilesetting';
import { CommunityPage } from '../community/community';

import { CommunityServices } from '../../providers/community-services';


@Component({
  selector: 'page-communityprofile',
  templateUrl: 'communityprofile.html'
})
export class CommunityprofilePage {
    userType:any;
    addComments: boolean;
    itemComments:boolean;
    imageUrl:any;
    showblock:any;
    showReply:any;
    detail:any;
    comment:any;
    comments:any;
    addVideo:any;
    connectLists:any;
    activityLists:any;
    communityMembers:any;
    post:any;
    link:any;
    videoUrl:any;
    communityProfile:any;
    communityProfileData:any;
    getCommunityMembers:any;
    base64Image:any;
    status:any;
    request_sent:any;
    name:any;
    token:any;
    profile_uid:any;
    connectionList:any;
    allConnections:any;
    user_id:any;
    emojiId:number=0;
    community: String = "activity";
  isAndroid: boolean = false;

  constructor(public nav: NavController,public platform: Platform, public storage:Storage,public popoverCtrl: PopoverController, public viewCtrl: ViewController,public sanitizer: DomSanitizer,public modalCtrl: ModalController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public communityServices: CommunityServices ) {
        this.isAndroid = platform.is('android');
      this.nav=nav;
      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token;})
    });
      
      this.profile_uid=navParams.get("profile_uid");
      this.loadThisPage(this.profile_uid);
  }

  loadThisPage(id){
    this.communityProfile=[];
    this.communityProfileData=[];
    this.status=[];
     // this.connectLists = false;
     //  this.activityLists = true;
      this.status = false;
      this.request_sent = false;
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.profileCommunity(id);
      this.memberProfile(id);
      
      this.addComments=false;
      this.itemComments=false;
      loader.dismiss();
  }


  showComment(post){
    let commentModal = this.modalCtrl.create(CommunitycommentsPage, { posts: post });
   commentModal.present();
  }
  messageModel(member) {

    let modal = this.modalCtrl.create(CommunitymessagePage,{member_data:member});
    modal.present();
  }
    profileSetting(member) {

    let modal = this.modalCtrl.create(MyprofilesettingPage,{member_data:member});
    modal.present();
  }
  

  cleanURL(oldURL: string): any  {
    if(oldURL !=null){  
      let url1 = oldURL.replace('https://www.youtube.com/watch?v=','https://www.youtube.com/embed/');
  
    let url2 = url1.replace("http://www.dailymotion.com/video/", "http://www.dailymotion.com/embed/video/");
 
    let url = url2.replace("https://vimeo.com/","https:\/\/player.vimeo.com\/video\/");
 return this.sanitizer.bypassSecurityTrustResourceUrl(url);}
   else{
     return null;
   }
  
}
  accessGallery(){
   Camera.getPicture({
     sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }
  
  addDetails(event){
    this.comment="";
    if(this.showblock==event){
        this.showblock=null;
    }
    else{
      this.showblock=event;
    }
  }
   replyComments(event){
    this.comments="";
    if(this.showReply==event){
        this.showReply=null;
    }
    else{
      this.showReply=event;
    }
 }

  itemDetails(){
  if (this.itemComments) {
        this.itemComments = false;
       
    } else {
       this.itemComments = true;
       
    }
  }

  addVideos(){
    if (this.addVideo) {
        this.addVideo = false;
       
    } else {
       this.addVideo = true;
     }
  }
   openUrl(metalink_url) {
console.log("URL is ",metalink_url);
        this.platform.ready().then(() => {
            let browser = new InAppBrowser(metalink_url,'_blank');

        });
  }
  
 profileCommunity(id){
      this.communityProfile=[];
      this.communityServices.userProfile(id).subscribe(users => {
      this.communityProfile = users.result.info.lists.data;

  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })

  }
 
  memberProfile(member_id){
     this.communityProfileData=[];
    this.communityServices.memberProfileData(member_id).subscribe(users => {
      this.communityProfileData = users.result.info.profile_details;
      this.status = users.result.info.approve_status.status;
      this.user_id = this.communityProfileData.id;
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })

  }
  Communities(){
    this.communityServices.getCommunityMembers().subscribe(users => {
      this.getCommunityMembers=users.result.data;
     
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
  
 }
  
  connectMember(user){
   
    this.communityServices.connectMember(user.id,user.name).subscribe(users => {
       this.showToast(users.result.info);
        this.memberProfile(user.id);
       this.request_sent = true;

      },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
 }


  Connections(id,val){
    this.communityServices.getConnectLists(id,val).subscribe(users => {
       this.allConnections=users.result.info.list;
 
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
    }

  setItems(ev) {
     var val = ev.target.value;
     let id = this.user_id;
   this.Connections(id,val);
  }
  

  addLikes(likeObj){
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();

   this.communityServices.addLike(likeObj).subscribe(data =>{
     this.showToast(data.result);
      this.profileCommunity(this.profile_uid);
   },
     err =>{
        if(err.status===401){
      this.showToast(JSON.parse(err._body).error);
    }
    else if(err.status===500){
      this.profileCommunity(this.profile_uid);
    }
    else{
      this.communityServices.showErrorToast(err);  
    }
    
  })
    loader.dismiss();
  }
 
  showToast(messageData){
    let toast = this.toastCtrl.create({
        message: messageData,
        position:"top",
        duration: 3000
      });
      toast.present();
   
  }

  sendPost(id1){
     if(this.comment != ""){
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
     this.communityServices.sendPosts(id1,this.comment).subscribe(datas =>{
     this.showToast(datas.result.info.message);
     this.comment="";
     // this.showblock= null;
     this.profileCommunity(this.profile_uid);
   },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
     loader.dismiss();
  }else{
     this.showToast("Enter Comments and Post");
   }
     
  }
 
  

   addUserPosts(id){
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
     this.communityServices.addUserPosts(id,this.base64Image,this.videoUrl,this.post,this.link).subscribe(datas =>{
     this.showToast(datas.result);
     this.profileCommunity(id);
     this.post="";
     this.link="";
     this.base64Image="";
     this.videoUrl="";
     this.showblock= null;
   },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
     loader.dismiss();
  }

  deleteComment(id){
    this.communityServices.deleteComment(id).subscribe(datas =>{
     this.showToast(datas.result);
     this.profileCommunity(this.profile_uid);
     },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
  }
  showConfirm(DeleteId) {
    let confirm = this.alertCtrl.create({
     
     subTitle: 'Confirm Deletion?',
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

  goBackToCommunity(id){
   this.nav.push(CommunityPage,{community_id:id});
  }
  profileMember(id){
    this.profileCommunity(id);
    this. memberProfile(id);
  }
  detailCommunity(){
    this.nav.pop();
  }
  public dashboardPage()
  {
    this.nav.setRoot(DashboardPage);
  }
 emojiPicker(userId)
   {
    let  likeEmoji={type:'likeEmoji'};
   let modal = this.popoverCtrl.create(EmojiPickerPage,likeEmoji);
    modal.present();
     modal.onDidDismiss(data => {
      if(data!=null)
      {
        let emojiSymbol=data.emojiImage;
        let name=emojiSymbol.replace(/[^a-z\d]+/gi, "");
        if(emojiSymbol==':thumbsup:')
        {
          this.emojiId=1;
        }
        else if(emojiSymbol==':heart:')
        {
          this.emojiId=2;
        }
        else if(emojiSymbol==':laughing:')
        {
          this.emojiId=3;
        }
        else if(emojiSymbol==':wow:')
        {
          this.emojiId=4;
        }
        else if(emojiSymbol==':disappointed_relieved:')
        {
          this.emojiId=5;
        }
        else if(emojiSymbol==':rage:')
        {
          this.emojiId=6;
        }
        let likeObj={"id":userId,"emoji":emojiSymbol,"name":name,"emojiId":this.emojiId};
        this.addLikes(likeObj);
      }
     })
   }

 }


