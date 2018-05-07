import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams,ActionSheetController, ModalController, ViewController,AlertController,LoadingController,PopoverController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { EmojiPickerPage } from '../../pages/emoji-picker/emoji-picker';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunitymessagePage } from '../communitymessage/communitymessage';
import { CommunitycommentsPage } from '../communitycomments/communitycomments';

import { MyprofilesettingPage } from '../myprofilesetting/myprofilesetting';
import { CommunityPage } from '../community/community';

import { CommunityServices } from '../../providers/community-services';


@Component({
  selector: 'page-communityprofile',
  templateUrl: 'communityprofile.html',
  providers : [CommunityServices]
})
export class CommunityprofilePage {
  @ViewChild(Content) content: Content;
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
    getPrivacyLists:any;
    getCommunityMembers:any=[];
    base64Image:any="";
    status:any;
    request_sent:any;
    name:any;
    token:any;
    profile_uid:any;
    connectionList:any;
    allConnections:any;
    eventScrollLists:any;
    nextPageURL:any;
    user_id:any;
    emojiId:number=0;
    community: String = "activity";
    isAndroid: boolean = false;
    connection:any="true";
    profile:any="true"; 
    my_id:any;
    authForm:FormGroup;
    submitAttempt:any;
    message:any;
    tabBarElement: any;
  constructor(public nav: NavController, public actionsheetCtrl: ActionSheetController,public platform: Platform, public storage:Storage,public formBuilder: FormBuilder,public popoverCtrl: PopoverController, public viewCtrl: ViewController,public sanitizer: DomSanitizer,public modalCtrl: ModalController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public communityServices: CommunityServices ) {
       this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.isAndroid = platform.is('android');
      this.nav=nav;
      this.profile_uid=navParams.get("profile_uid");
      this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('id').then((id) => { this.my_id=id; });
      storage.get('token').then((token) => { this.token=token;
       this.profileCommunity(this.profile_uid);
      this.memberProfile(this.profile_uid);
      this.getPrivacy(this.profile_uid);
    })
      
    });
      this.authForm = formBuilder.group({
        videoUrl : ['', Validators.compose([Validators.pattern('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com|dailymotion\.com|metacafe\.com|wines\.com)\/.+$')])],
      
    });
        this.addComments=false;
        this.itemComments=false;
 
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
  scrollToBottom(){
    this.content.scrollToBottom();
  }
  ionViewDidEnter(){
      this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('id').then((id) => { this.my_id=id; });
      this.storage.get('token').then((token) => { this.token=token;
       this.profileCommunity(this.profile_uid);
      this.memberProfile(this.profile_uid);
      this.getPrivacy(this.profile_uid);
    })
      
    });
  }
    ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  loadThisPage(id){
    this.allConnections=[];
    this.communityProfile=[];
    this.communityProfileData=[];
    this.getCommunityMembers=[];
    this.community="activity";
    this.status=[];
     
      this.status = false;
      this.request_sent = false;      
      this.profileCommunity(id);
      this.memberProfile(id);
      this.getPrivacy(id);
      this.addComments=false;
      this.itemComments=false;
      
  }
showConfirm(id){
     let confirm = this.alertCtrl.create({
     subTitle: 'This post will be deleted',
       buttons: [
        {
          text: 'Cancel',
         },
        {
          text: 'Ok',
          handler: () => {
           this.deletePost(id);
          
          }
        }
      ]
    });
    confirm.present();
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
  deletePost(id){
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.communityServices.deletePost(id).subscribe(datas =>{
     this.showToast(datas.result);
      this.profileCommunity(this.profile_uid);
      loader.dismiss();
     },
     err =>{
    loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
    
  }
  showComment(post){
    this.nav.push(CommunitycommentsPage, { posts: post });
   //  let commentModal = this.modalCtrl.create(CommunitycommentsPage, { posts: post });
   // commentModal.present();
  }
  messageModel(member) {

    let modal = this.modalCtrl.create(CommunitymessagePage,{member_data:member});
    modal.present();
  }
    profileSetting(member) {

    let modal = this.popoverCtrl.create(MyprofilesettingPage,{member_data:member});
    modal.present();
  }
  
goBackToProfile(profile_id){
        this.profileCommunity(profile_id);
      this.memberProfile(profile_id);
      this.getPrivacy(profile_id);
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
        this.platform.ready().then(() => {
            let browser = new InAppBrowser(metalink_url,'_blank');

        });
  }
  
 profileCommunity(id){
      this.communityProfile=[];
      this.communityServices.userProfile(id).subscribe(users => {
      this.communityProfile = users.result.info.lists.data;
      this.nextPageURL=users.result.info.lists.next_page_url;

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
  getPrivacy(user_id){
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.communityServices.getPrivacy(user_id).subscribe(users => {
      let Privacy = users.result[0];
       if(Privacy != null){
     
       
       this.connection = Privacy.privacy_connection;
    
       this.profile = Privacy.privacy_profile;
       
       }
      loader.dismiss();
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
    loader.dismiss();
  })
  }
  Communities(id){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.communityServices.getCommunityMembers(id).subscribe(users => {
      this.getCommunityMembers=users.result.data;
      this.nextPageURL=users.result.next_page_url;
      loader.dismiss();
  },
   err =>{
    loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
  
 }
 Activity(id){
   this.profileCommunity(id);

 }
  
  connectMember(user){
        let loader = this.loadingCtrl.create({ content: "Please wait..." });     
        loader.present();
        this.communityServices.connectMember(user.id,user.name).subscribe(users => {
        this.showToast(users.result.info);
        this.memberProfile(user.id);
       this.request_sent = true;
       loader.dismiss();
      },
   err =>{
    loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
 }


  Connections(id,val){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
        loader.present();
       this.communityServices.getConnectLists(id,val).subscribe(users => {
       this.allConnections=users.result.info.list.data;
       this.nextPageURL=users.result.info.list.next_page_url;
      loader.dismiss();
  },
   err =>{
    loader.dismiss();
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
     this.showToast(data.result.info.message);
      this.profileCommunity(this.profile_uid);
      loader.dismiss();
   },
      err =>{    
    this.communityServices.showErrorToast(err);
    loader.dismiss();
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

  sendPost(id1){
     if(this.comment != ""){
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
     this.communityServices.sendPosts(id1,this.comment).subscribe(datas =>{
     this.showToast(datas.result.info.message);
     this.comment="";
     // this.showblock= null;
     this.profileCommunity(this.profile_uid);
      loader.dismiss(); 
   },
     err =>{
    
       this.communityServices.showErrorToast(err);
        loader.dismiss(); 
         })
    
  }
  else
  {
    this.showToast("Enter Comments and Post");
  }
   
  }
 
  
metaLink:any = "";
pressevent(id){
  this.addUserPosts(id);
}
   addUserPosts(id){   
     if(!this.authForm.valid){
      this.submitAttempt = true;
    }else{
      this.submitAttempt = false;
       if(this.post!='' && this.post!=undefined && this.post!=null)
       {
        this.message=this.urlifyMessage(this.post);
        this.urlifyLink(this.post);
       }
   if(this.message != ""){
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
     loader.present();
     this.communityServices.addUserPosts(id,this.base64Image,this.authForm.value.videoUrl,this.message,this.metaLink).subscribe(datas =>{
     this.showToast(datas.result);
     this.profileCommunity(id);
     this.post="";
     this.message="";
     this.metaLink="";
     this.base64Image="";
     this.videoUrl="";
     this.addVideo = false;
     this.showblock= null;
     loader.dismiss();
   },
     err =>{    
    this.communityServices.showErrorToast(err);
    loader.dismiss();
  })
   }
    else{
     this.showToast("Enter message and Post");
   }
 }
     
  }
  

   urlifyMessage(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;

            return text.replace(urlRegex, (url)=> {
              // return "";
                 return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
          }

         // urlArr = [];
         urlifyLink(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            var i=0;
            return text.replace(urlRegex, (data)=>{
                this.metaLink= data;
                i++;
            })
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
 emojiPicker(ev,userId)
   {
    let  likeEmoji={type:'likeEmoji'};
   let popover = this.popoverCtrl.create(EmojiPickerPage,likeEmoji);
   popover.present({
      ev: ev
    });
         popover.onDidDismiss(data => {
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
  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.userpostsscroll(this.profile_uid);
            }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
   userpostsscroll(id)
  {
     this.communityServices.userpostsscroll(this.nextPageURL,id).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.info.lists.data;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.communityProfile.push(this.eventScrollLists[i]);
        }
      
       this.nextPageURL=eventsscroll.result.info.lists.next_page_url;     
    },
    err =>{
   
    this.communityServices.showErrorToast(err);
  });
  }

   doInfinite1(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.connectionscroll(this.profile_uid);
            }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  connectionscroll(id)
  {
     this.communityServices.connectionscroll(this.nextPageURL,id).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.info.list.data;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.allConnections.push(this.eventScrollLists[i]);
        }
      
       this.nextPageURL=eventsscroll.result.info.list.next_page_url;     
    },
    err =>{
   
    this.communityServices.showErrorToast(err);
  });
  }
   doInfinite2(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.communitydetailscroll(this.profile_uid);
            }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
   communitydetailscroll(id)
  {
     this.communityServices.communitydetailscroll(this.nextPageURL,id).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.data;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.getCommunityMembers.push(this.eventScrollLists[i]);
        }
      
       this.nextPageURL=eventsscroll.result.next_page_url;
            
     
    },
    err =>{
   
    this.communityServices.showErrorToast(err);
  });
  }

 }


