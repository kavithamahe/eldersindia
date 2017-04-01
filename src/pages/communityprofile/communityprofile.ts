import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController,AlertController,LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunitymessagePage } from '../communitymessage/communitymessage';
import { CommunityServices } from '../../providers/community-services';


@Component({
  selector: 'page-communityprofile',
  templateUrl: 'communityprofile.html',
})
export class CommunityprofilePage {
    userType:any;
    addComments: boolean;
    itemComments:boolean;
    imageUrl:any;
    showblock:any;
    detail:any;
    comment:any;
    addVideo:any;
    connectLists:any;
    activityLists:any;
    communityMembers:any;
    post:any;
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
  constructor(public nav: NavController, public storage:Storage, public viewCtrl: ViewController,private sanitizer: DomSanitizer,public modalCtrl: ModalController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public communityServices: CommunityServices ) {
       this.activityLists = true;
      this.nav=nav;
      this.status = false;
      this.request_sent = false;

      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      })
    });
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.profile_uid=navParams.get("profile_uid");
      this.profileCommunity(this.profile_uid);
      this.memberProfile(this.profile_uid);
      
      this.addComments=false;
      this.itemComments=false;
      loader.dismiss();
  }
  messageModel(member) {

    let modal = this.modalCtrl.create(CommunitymessagePage,{member_data:member});
    modal.present();
  }
  
 cleanURL(oldURL: string): any  {
    console.log("vidweo url: ",oldURL);
    // http://www.dailymotion.com/video/
  // let url = oldURL.replace("watch?v=", "")
  let url;
  url = oldURL.replace("http://www.dailymotion.com/video/", "http://www.dailymotion.com/embed/video/");
  
  url = oldURL.replace("http://www.youtube.com","http://www.youtube.com/embed");
  url = oldURL.replace("http://www.youtube.com/embed/","http://www.youtube.com/embed/");
    url = oldURL.replace("https://www.youtube.com/watch?v=aUN6RPMIoeo","https://www.youtube.com/embed/aUN6RPMIoeo"); 

  url = oldURL.replace("http://www.youtube.com/embed/watch/","http://www.youtube.com/embed/");
  url = oldURL.replace("https://vimeo.com/","https:\/\/player.vimeo.com\/video\/");
  // url = oldURL.replace("http://www.youtube.com/embed/watch/", "http://www.youtube.com/embed/")
 return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
  
 profileCommunity(id){
      this.communityServices.userProfile(id).subscribe(users => {
      this.communityProfile = users.result.info.lists.data;

  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })

  }
 
  memberProfile(member_id){
    this.communityServices.memberProfileData(member_id).subscribe(users => {
      this.communityProfileData = users.result.info.profile_details;
      this.status = users.result.info.approve_status.status;
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })

  }
  communityMember(){
    this.communityServices.getCommunityMembers().subscribe(users => {
      this.getCommunityMembers=users.result.data;
     
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
    this.activityLists = false;
    this.connectLists = false;
     if (this.communityMembers) {
        this.communityMembers = false;
       
    } else {
       this.communityMembers = true;
     }
    
 }
  
  connectMember(user){
   
    this.communityServices.connectMember(user.id,user.name).subscribe(users => {
       this.showToast(users.result.info);
       this.request_sent = true;

      },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
 }
 activityMember(){
   this.connectLists = false;
   this.communityMembers = false;

   if (this.activityLists) {
        this.activityLists = false;
       
    } else {
       this.activityLists = true;
     }
 }
 // communityMember(){
 //   this.activityLists = false;
 //   this.connectLists = false;
 //   if (this.communityMembers) {
 //        this.communityMembers = false;
       
 //    } else {
 //       this.communityMembers = true;
 //     }
 // }
  connectList(){
    this.communityServices.getConnectList().subscribe(users => {
       this.allConnections=users.result.info.list;  
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
    this.activityLists = false;
    this.communityMembers = false;

     if (this.connectLists) {
        this.connectLists = false;
       
    } else {
       this.connectLists = true;
     }
     
  }
  setItems(ev) {
     var val = ev.target.value;
   
    
    this.communityServices.getConnectLists(val).subscribe(users => {
     this.allConnections=users.result.info.list; 
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
   
  }
  

  addLikes(id){
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
   this.communityServices.addLike(id).subscribe(data =>{
     this.showToast(data.result);
     this.profileCommunity(this.profile_uid);
   },
     err =>{
    
    this.communityServices.showErrorToast(err);
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
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
     this.communityServices.sendPosts(id1,this.comment).subscribe(datas =>{
     this.showToast(datas.result);
     this.comment="";
     // this.showblock= null;
     this.profileCommunity(this.profile_uid);
   },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
     loader.dismiss();
  }

   addUserPosts(id){
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
     this.communityServices.addUserPosts(id,this.base64Image,this.videoUrl,this.post).subscribe(datas =>{
     this.showToast(datas.result);
     this.profileCommunity(id);
     this.post="";
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

  goBackToCommunity(){
    this.nav.pop();
  }
  public dashboardPage()
  {
    this.nav.setRoot(DashboardPage);
  }
 }


