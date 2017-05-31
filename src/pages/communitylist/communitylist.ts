import { Component, ViewChild } from '@angular/core';
import { NavController,Slides, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunityPage } from '../community/community';
import { CommunityServices } from '../../providers/community-services';

@Component({

  selector: 'page-communitylist',
  templateUrl: 'communitylist.html',
  providers : [CommunityServices]
})
export class CommunitylistPage {
  @ViewChild(Slides) slides: Slides;
   // private start:number=0;
	community: String = "my_community";
  isAndroid: boolean = false;
  communitylists:any;
  imageUrl:any;
  uid:any;
  categoryLists:any;
  searchTerm: string = '';
  searchData:any;
  categoryName:any;
  token:any;
  id:any;
  nextPageURL:any='';
  eventScrollLists:any;
  searchButton:boolean=false;
  searchValue:any;
  searchTextBox:any='';
  prev_index:any = 0;
  constructor(public nav: NavController,public storage:Storage,public loadingCtrl: LoadingController, public navParams: NavParams,platform: Platform,public toastCtrl: ToastController, public communityServices: CommunityServices ) {
     this.isAndroid = platform.is('android');
     // this.searchData = "";
   }
   searchCall(searchValue){
     this.searchButton=!searchValue;
   }
 
  getPost(id){
    this.nav.push(CommunityPage,{community_id:id});
  }
  slideChanged() {
    let currentIndex = this.prev_index;
    if(currentIndex == 1){
      this.community = "my_community";
       this.myCommunity("");
    }else{
      this.community = "other_community";
      this.otherCommunity("");
    }
    this.prev_index = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }
   changeSlide(){
    this.slides.freeMode = true;
    if(this.community == 'other_community'){
    this.slides.slideTo(1);  
    //this.slides.slideNext(300,true);
    
    
    }else{
      this.slides.slideTo(0);  
      //this.slides.slidePrev(300,true);
      
    }
    
  }
  
  myCommunity(searchData){
    this.prev_index = this.slides.getActiveIndex();
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
    this.communitylists =[];
    this.categoryLists=[]
      this.communityServices.myCommunity(searchData).
      subscribe(mycommunity => {
      this.communitylists = mycommunity.result.info.data;
      this.categoryLists = mycommunity.result.get.communityCategory;
      this.nextPageURL=mycommunity.result.info.next_page_url;
  },
   err =>{
    this.communitylists =[];
    this.communityServices.showErrorToast(err);
  })
  loader.dismiss();
  }

  otherCommunity(data){
    this.prev_index = this.slides.getActiveIndex();
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
      loader.present();
      this.communitylists=[];
      this.categoryLists=[];
      this.communityServices.recommendedCommunity(data).
      subscribe(mycommunity => {
      this.communitylists = mycommunity.result.info.data;
      this.categoryLists = mycommunity.result.get.communityCategory;
      this.nextPageURL=mycommunity.result.info.next_page_url;

  },
   err =>{
    this.communitylists =[];
    this.communityServices.showErrorToast(err);
  })
       loader.dismiss();
  }
  getItems(ev) {
    
    var val = ev.target.value;
    this. myCommunity(val);
   
  }
  setItems(ev) {
   
    var val = ev.target.value;
    this. otherCommunity(val);
   
  }
  getCategory(id){
   
    this.communityServices.getCommunity(id).
     subscribe(mycommunity => {
      this.communitylists = mycommunity.result.info.data;
      this.categoryLists = mycommunity.result.get.communityCategory;
  },
   err =>{
    this.communitylists =[];
    this.communityServices.showErrorToast(err);
  })

  }
  
  setCategory(id){
    this.communityServices.setCategory(id).
     subscribe(otherCommunity => {
      this.communitylists = otherCommunity.result.info.data;
      this.categoryLists = otherCommunity.result.get.communityCategory;
  },
   err =>{
    
    this.communityServices.showErrorToast(err);
  })
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.communityscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  communityscroll()
  {
     this.communityServices.eventsscroll(this.nextPageURL).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.info.data;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.communitylists.push(this.eventScrollLists[i]);
        }
      
       this.nextPageURL=eventsscroll.result.info.next_page_url;     
    },
    err =>{
   
    this.communityServices.showErrorToast(err);
  });
  }

public dashboardPage()
  {
    this.nav.setRoot(DashboardPage);
  }
ionViewWillEnter (){
  

  this.storage.ready().then(() => {

      this.storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      this.storage.get('id').then((id) => { this.id=id; })
      this.storage.get('token').then((token) => { this.token=token;
      if(this.community == "my_community"){
      this.myCommunity("");  
      }
      else{
        this.otherCommunity("");
      }
      })
    });
}

}
