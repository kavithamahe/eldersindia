import { Component} from '@angular/core';
import { ModalController,ActionSheetController , NavController, NavParams,AlertController,LoadingController,Platform,ToastController,PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';


import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunitycommentsPage } from '../communitycomments/communitycomments';
import { CommunityprofilePage } from '../communityprofile/communityprofile';
import { CommunityServices } from '../../providers/community-services';
import { EmojiPickerPage } from '../../pages/emoji-picker/emoji-picker';
import { CommunitymembersPage } from '../../pages/communitymembers/communitymembers';

import { DomSanitizer } from '@angular/platform-browser/';
import { InAppBrowser } from 'ionic-native';



@Component({
  selector: 'page-community',
  templateUrl: 'community.html',
  providers : [CommunityServices]
})

export class CommunityPage {
   submitAttempt:any;
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
    post:any;
    link:any;
    videoUrl:any;
    users=[];
    user:any;
    communityDetailData:any;
    members:any;
    base64Image:any="";
    isJoined:any;
    show_member:any;
    token:any;
    community_id:any;
    nextPageURL:any='';
    eventScrollLists:any;
    emojiId:number=0;
    viewMore:boolean=false;
    show_description:any;
    user_id:any= 0;
    authForm:FormGroup;
    message:any='';
  constructor(public platform: Platform, public actionsheetCtrl: ActionSheetController,public modal: ModalController, public formBuilder: FormBuilder,public sanitizer: DomSanitizer,public storage:Storage, public nav: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public communityServices: CommunityServices,public popoverCtrl: PopoverController ) {
    this.nav=nav;

    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.community_id=this.navParams.get("community_id");
        this.communityList(this.community_id);
        this.communityDetail(this.community_id);
        this.addComments=false;
        this.itemComments=false;
        this.userType="sponsor";
      });
      storage.get('id').then((id) => { this.user_id=id; })
    });
    this.authForm = formBuilder.group({
        videoUrl : ['', Validators.compose([Validators.pattern('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be|vimeo\.com|dailymotion\.com|metacafe\.com|wines\.com)\/.+$')])],
      
    });

}

files:any;

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
showConfirm(id){
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
           this.deletePost(id);
          
          }
        }
      ]
    });
    confirm.present();
  }
   openUrl(metalink_url) {
        this.platform.ready().then(() => {
            let browser = new InAppBrowser(metalink_url,'_blank');

        });
  }
toggleContent(){
    if(this.show_description == false){
      this.show_description = true;
    }else{
      this.show_description = false;
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

  cleanURL(oldURL: string): any  {
    if(oldURL !=null){ 
      let url1 = oldURL.replace('https://www.youtube.com/watch?v=','https://www.youtube.com/embed/');
    
      let url2 = url1.replace("http://www.dailymotion.com/video/", "http://www.dailymotion.com/embed/video/");
   
      let url = url2.replace("https://vimeo.com/","https:\/\/player.vimeo.com\/video\/");
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    else{
      return null;
    }
  }
// getDate(date){
//   console.log("current time");
//   // getDate
//   let today = new Date().toISOString();
//   console.log("current time ",today);
//   let time:any = new Date("2017-03-05 11:26:16").getHours();
// let date2:any = new Date("2017-03-06 12:26:16").getHours();
// console.log(time -date2, time, date2, "sdfsd")
// }
  getDate(stringDate){
      var dateOut = new Date(stringDate);
      dateOut.setDate(dateOut.getDate());
      return dateOut;
    };
  showComment(post){
    let commentModal = this.modal.create(CommunitycommentsPage, { posts: post });
   commentModal.present();
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
       }
       else {
       this.addVideo = true;
      }
  }

  communityDetail(id1){
      let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.communityServices.communityDetail(id1).subscribe(users => {
      this.communityDetailData = users.result.info;
      this.members =  users.result.info.members;
      this.show_member = this.members.length;
      if(this.show_member>3){
        this.viewMore=true;
      }
      loader.dismiss();
  },
   err =>{
     loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
  }
  joinCommunity(id){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
    this.communityServices.joinCommunity(id).subscribe(users => {
      this.showToast(users.result);
      this.communityDetail(id);
      this.nav.pop();
      loader.dismiss();
  },
   err =>{
     loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
  }
  communityProfile(id){
     this.nav.push(CommunityprofilePage,{profile_uid:id});
  }
  communityProfiles(id){

    this.communityProfile(id);
  }
  membersProfile(id){
    this.communityProfile(id);
  }
  profileImage(id){
    this.communityProfile(id);
  }
  myImage(id){
    this.communityProfile(id);
  }
 communityList(id){
     this.communityServices.getCommunityPost(id).subscribe (users => {
      this.users = users.result.info.lists.data;
       this.nextPageURL=users.result.info.lists.next_page_url;

      },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
   }
 
  addLikes(likeObj){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();

   this.communityServices.addLike(likeObj).subscribe(data =>{
     this.showToast(data.result);
      this.communityList(this.community_id);
      loader.dismiss();
   },
     err =>{
        if(err.status===401){
      this.showToast(JSON.parse(err._body).error);
    }
    else if(err.status===500){
      this.communityList(this.community_id);
    }
    else{
      this.communityServices.showErrorToast(err);  
    }
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


  
metaLink:any = "";

  postCommunity(id){
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
     loader.present();
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
       
       this.communityServices.postCommunity(id,this.base64Image,this.authForm.value.videoUrl,this.message,this.metaLink).subscribe(datas =>{
       this.showToast(datas.result);
       this.communityList(id);
       this.post="";
       this.message="";
       this.metaLink="";
       this.authForm.value.videoUrl="";
       this.base64Image="";
       this.addVideo = false;
       this.showblock= null;
       loader.dismiss();
     },
       err =>{
      loader.dismiss();
      this.communityServices.showErrorToast(err);
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
                return '<a href="' + url + '" target="_blank">' + url + '</a>';
            })
          }
         urlifyLink(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            var i=0;
            return text.replace(urlRegex, (data)=>{
                this.metaLink= data;
                i++;
            })
        }

  deletePost(id){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
     loader.present();
    this.communityServices.deletePost(id).subscribe(datas =>{
     this.showToast(datas.result);
     this.communityList(this.community_id);
     loader.dismiss();
     },
     err =>{
    loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
  }
  
  deleteComment(id){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
     loader.present();
     this.communityServices.deleteComment(id).subscribe(datas =>{
     this.showToast(datas.result);
     this.comment="";
     this.communityList(this.community_id);
     loader.dismiss();
     },
     err =>{
    loader.dismiss();
    this.communityServices.showErrorToast(err);
  })
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
        else if(emojiSymbol==':open_mouth:')
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
  
 showModel(member)
   {
    
   let modal = this.popoverCtrl.create(CommunitymembersPage,{members:member});
    modal.present();
     
   }  
doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.communityscroll(this.community_id);
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
   communityscroll(id)
  {
     this.communityServices.communityscroll(this.nextPageURL,id).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.info.lists.data;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.users.push(this.eventScrollLists[i]);
        }
      
       this.nextPageURL=eventsscroll.result.info.lists.next_page_url;     
    },
    err =>{
   
    this.communityServices.showErrorToast(err);
  });
  }

 /* ionViewWillEnter(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    
    this.community_id=this.navParams.get("community_id");
        this.communityList(this.community_id);
        this.communityDetail(this.community_id);
        this.addComments=false;
        this.itemComments=false;
        loader.dismiss();
        this.userType="sponsor";
  }*/

  }


