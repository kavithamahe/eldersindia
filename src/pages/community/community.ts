import { Component,ViewChild} from '@angular/core';
import { Content } from 'ionic-angular';
import { ModalController,ActionSheetController, ViewController,PopoverController,NavController, NavParams,AlertController,LoadingController,Platform,ToastController } from 'ionic-angular';
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
   @ViewChild(Content) content: Content;
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
    connectionInfo:any=[];
     alert:any;
  constructor(public platform: Platform,public popoverCtrl: PopoverController, public actionsheetCtrl: ActionSheetController,public modal: ModalController, public formBuilder: FormBuilder,public sanitizer: DomSanitizer,public storage:Storage, public nav: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public communityServices: CommunityServices) {
    this.nav=nav;

    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
        this.community_id=this.navParams.get("community_id");
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
  scrollToTop() {
    this.content.scrollToTop();
  }
  scrollToBottom(){
    this.content.scrollToBottom();
  }
  ionViewDidEnter(){
      this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('token').then((token) => { this.token=token; 
        this.community_id=this.navParams.get("community_id");
        this.communityList(this.community_id);
        this.communityDetail(this.community_id);
        this.getConnections();
        this.addComments=false;
        this.itemComments=false;
        this.userType="sponsor";
      });
      this.storage.get('id').then((id) => { this.user_id=id; })
    });

  }
files:any;

 openMenu(id,poster_id) {
    let actionSheet = this.actionsheetCtrl.create({
      title: '',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Report Abuse',
          role: 'destructive',
          handler: () => {
            this.showPrompt(id,poster_id);
          }
        },
      ]
    });
    actionSheet.present();
  }
  reportAbuse(data,id,poster_id){

   let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();

   this.communityServices.reportAbuse(data,this.community_id,id,poster_id).subscribe(data =>{
  this.communityServices.showToast(data.result);
      loader.dismiss();
   },
     err =>{
        if(err.status===401){
      this.showToast(JSON.parse(err._body).error);
    }
    else if(err.status===500){
    }
    else{
      this.communityServices.showErrorToast(err);  
    }
    loader.dismiss();
  })
  }
   showPrompt(id,poster_id) {
    let prompt = this.alertCtrl.create({
      title: 'Report this post',
      message: "All reports are strictly confidential. Please describe the reason",
      inputs: [
        {
          name: 'title',
          placeholder: 'Reason'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Submit',
          handler: data => {
            
            if(data.title == ""){
              this.communityServices.showToast("Please enter the reason");
               return false;
            }
            else{
            this.reportAbuse(data.title,id,poster_id);
          }
          }
        }
      ]
    });
    prompt.present();
  }
   getConnections(){
  
  //let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    //loader.present();    
      this.communityServices.getConnections(this.user_id).subscribe(connections => {
        this.connectionInfo=connections.result;
       // loader.dismiss();
     },
   err =>{
    //loader.dismiss();
      this.communityServices.showErrorToast(err);
  })
 }

  presentPopover(ev,id) { 
    
    if(this.connectionInfo.length == 0){
      this.communityServices.showToast("No Contacts")
    }
    else{
    let popover = this.popoverCtrl.create(CommunityPopoverPage, {"communityID":id,"user_id":this.user_id
    });
    popover.present({
      ev: ev
    });
    popover.onDidDismiss(() => {
       this.community_id=this.navParams.get("community_id");
       this.communityList(this.community_id);
       this.communityDetail(this.community_id);
   
    })
  }
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
  showComment(post){
    this.nav.push(CommunitycommentsPage, { posts: post });
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
      if(this.show_member>7){
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
     //this.showToast(data.result.info.message);
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
pressevent(id){
  this.postCommunity(id);
}
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
        if(this.message != "" || this.base64Image!= "" || this.authForm.value.videoUrl!=""){
       
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
       loader.dismiss();
     //this.showToast("Enter message and Post");
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
  

  public dashboardPage()
  {
    this.nav.setRoot(DashboardPage);
  }
  emojiPicker(ev,userId,id)
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
    
   let modal = this.modal.create(CommunitymembersPage,{members:member});
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



}

@Component({
  template: `<ion-title class="req-ti">Request to join communities</ion-title> 
  <div class="register-form">

          <ion-item class="sle">
          <ion-label>To</ion-label>
             <ion-select multiple="true" [(ngModel)]="selectedConnections" [ngModelOptions]="{standalone: true}">
          <ion-option *ngFor="let name of connectionInfo" [value] = "name">{{name.friend_name}}
          </ion-option>
        </ion-select> 
               
           </ion-item>
  <button ion-button round full (click)="inviteFriends()" class="btn-blue">Invite</button>

</div> 
  `
})
export class CommunityPopoverPage {
  selectedConnections:any;
  connectionInfo:any; 
  friendsId:any;
  communityId:any;
  imageUrl:any;
  token:any;
  user_id:any;
  user_ids:any;
  constructor(public viewCtrl: ViewController,public navParams: NavParams,public toastCtrl: ToastController,public communityServices: CommunityServices,public loadingCtrl: LoadingController,public storage:Storage) {  
    
     this.storage.ready().then(() => {
      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('token').then((token) => { this.token=token; 
     // this.getConnections();
      });
      this.storage.get('id').then((id) => { this.user_ids=id; 
      this.user_id=this.navParams.get("user_id");
      this.getConnections();
    })
    });
   }
  getConnections(){
  
  //let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    //loader.present();    
      this.communityServices.getConnections(this.user_id).subscribe(connections => {
        this.connectionInfo=connections.result;
       // loader.dismiss();
     },
   err =>{
    //loader.dismiss();
      this.communityServices.showErrorToast(err);
  })
 }
 inviteFriends(){ 
if(this.selectedConnections != undefined){
 let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();    
      this.communityServices.inviteFriends(this.communityId,this.selectedConnections).subscribe(connections => {
       //this.connectionInfo=connections.result;
    
        loader.dismiss();

        this.showToaster(connections.result);
        //this.navCtrl.push(BlogsPage);
        this.viewCtrl.dismiss();
     },
    (err) => { 
        if(err.status===401)
        {
        this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Try again later");
        }
        loader.dismiss();
      });
    }else{
      this.showToaster("Please Select atleast one");
    }
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

 
}
