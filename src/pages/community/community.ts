import { Component} from '@angular/core';
import { ModalController, NavController, NavParams,AlertController,LoadingController,Platform,ToastController,PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';


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
  // providers : [CommunityServices]
})

export class CommunityPage {
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
    base64Image:any;
    isJoined:any;
    show_member:any;
    token:any;
    community_id:any;
    nextPageURL:any='';
    eventScrollLists:any;
    emojiId:number=0;
    viewMore:boolean=false;
    show_description:any;
    
  constructor(public platform: Platform,public modal: ModalController, public sanitizer: DomSanitizer,public storage:Storage, public nav: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public communityServices: CommunityServices,public popoverCtrl: PopoverController ) {
    this.nav=nav;

    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; });
    });

    // let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    // loader.present();
    
    // this.community_id=navParams.get("community_id");
    //     this.communityList(this.community_id);
    //     this.communityDetail(this.community_id);
    //     this.addComments=false;
    //     this.itemComments=false;
    //     loader.dismiss();
    //     this.userType="sponsor";

}

files:any;

onChange(event: any, input: any ,id) {
    this.files = [].slice.call(event.target.files);

    input.value = this.files.map(f => f.name).join(', ');

    this.communityServices.fileUpload(id,this.files[0]).subscribe(data=>{
      console.log(data);
    })
  }


   openUrl(metalink_url) {
console.log("URL is ",metalink_url);
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
      this.communityServices.communityDetail(id1).subscribe(users => {
      this.communityDetailData = users.result.info;
      this.members =  users.result.info.members;
      this.show_member = this.members.length;
      console.log(this.show_member);
      if(this.show_member>4){
        this.viewMore=true;
      }
      
  },
   err =>{
    this.communityServices.showErrorToast(err);
  })
  }
  joinCommunity(id){
    this.communityServices.joinCommunity(id).subscribe(users => {
      this.showToast(users.result);
      this.communityDetail(id);
      this.nav.pop();
  },
   err =>{
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
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();

   this.communityServices.addLike(likeObj).subscribe(data =>{
     this.showToast(data.result);
      this.communityList(this.community_id);
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


  

  postCommunity(id){
     let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
     loader.present();
     this.communityServices.postCommunity(id,this.base64Image,this.videoUrl,this.post,this.link).subscribe(datas =>{
     this.showToast(datas.result);
     this.communityList(id);
     this.post="";
     this.link="";
     this.videoUrl="";
     this.base64Image="";
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
     this.comment="";
     this.communityList(this.community_id);
     },
     err =>{
    
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

  ionViewWillEnter(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    
    this.community_id=this.navParams.get("community_id");
        this.communityList(this.community_id);
        this.communityDetail(this.community_id);
        this.addComments=false;
        this.itemComments=false;
        loader.dismiss();
        this.userType="sponsor";
  }

  }


