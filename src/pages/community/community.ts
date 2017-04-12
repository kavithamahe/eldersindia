import { Component} from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';


import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunityprofilePage } from '../communityprofile/communityprofile';
import { CommunityServices } from '../../providers/community-services';
import { DomSanitizer } from '@angular/platform-browser/';


@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
})

export class CommunityPage {
    userType:any;
    addComments: boolean;
    itemComments:boolean;
    imageUrl:any;
    showblock:any;
    detail:any;
    comment:any;
    addVideo:any;
    post:any;
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
    
  constructor(public sanitizer: DomSanitizer,public storage:Storage, public nav: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public communityServices: CommunityServices ) {
    this.nav=nav;

    this.storage.ready().then(() => {
      storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; });
    });

    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    
    this.community_id=navParams.get("community_id");
        this.communityList(this.community_id);
        this.communityDetail(this.community_id);
        this.addComments=false;
        this.itemComments=false;
        loader.dismiss();
        this.userType="sponsor";

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
      console.log(this.members.length);   
      
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
 communityList(id){
     this.communityServices.getCommunityPost(id).subscribe (users => {
      this.users = users.result.info.lists.data;
      // this.nextPageURL=users.result.info.lists.next_page_url;

      },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
   }
  //    doInfinite(infiniteScroll) {
  //   setTimeout(() => {      
  //     if(this.nextPageURL!=null && this.nextPageURL!='')
  //     {
  //      this.newsscroll();
  //     }
  //     else{
  //       infiniteScroll.enable(false);
  //     }
  //     infiniteScroll.complete();
  //   }, 500);
  // }
  // newsscroll()
  // {
  //    this.communityServices.eventsscrolls(this.nextPageURL).subscribe(
  //    (eventsscroll) => {
  //     this.eventScrollLists=eventsscroll.result.info.data;
  //     for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
  //       this.users.push(this.eventScrollLists[i]);
  //       }
      
  //      this.nextPageURL=eventsscroll.result.info.lists.next_page_url;     
  //   },
  //   err =>{
   
  //   this.communityServices.showErrorToast(err);
  // });
  // }
 
  addLikes(id){
    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
   this.communityServices.addLike(id).subscribe(data =>{
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

  sendPost(id1){
    if(this.comment != ""){

    let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
    loader.present();
     this.communityServices.sendPosts(id1,this.comment).subscribe(datas =>{
     this.showToast(datas.result);
     this.comment="";
     this.communityList(this.community_id);
     },
     err =>{
    
    this.communityServices.showErrorToast(err);
  })
     loader.dismiss();
   }else{
     this.showToast("Enter Comments and Post");
   }
     
  }

  postCommunity(id){
     let loader = this.loadingCtrl.create({ content: "Please wait initializing..." });     
     loader.present();
     this.communityServices.postCommunity(id,this.base64Image,this.videoUrl,this.post).subscribe(datas =>{
     this.showToast(datas.result);
     this.communityList(id);
     this.post="";
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

  
  }


