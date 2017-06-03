import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,Platform,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { Externallinks } from '../../providers/externallinks';

import { InAppBrowser } from 'ionic-native';

/*
  Generated class for the Externallinks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-externallinks',
  templateUrl: 'externallinks.html',
  providers:[Externallinks]
})
export class ExternallinksPage {
	imageUrl:any;
	token:any;
	externalLinks:any;
  nextPageURL:any='';
  eventScrollLists:any;
  externalLinksLists:any;

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public externallinks:Externallinks,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  this.storage.ready().then(() => {
    storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
         this.externalLinksList();
         this.externalListLinks();
    })

  });

  }

 externalLinksList(){
 	 let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this.externallinks.externalLinksList().subscribe (users => {
       this.externalLinks=users.result.data;
      this.nextPageURL=users.result.next_page_url;
      loader.dismiss();
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
      }
    );
    
    
  }
  externalListLinks(){
    let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
     this.externallinks.externalListLinks().subscribe (users => {
      this.externalLinksLists = users.result.info;
      loader.dismiss();
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
      }
    );
    
    
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
 openUrl(metalink_url) {
console.log("URL is ",metalink_url);
        this.platform.ready().then(() => {
            let browser = new InAppBrowser(metalink_url,'_blank');

        });
  }

   doInfinite(infiniteScroll) {
    setTimeout(() => {      
      if(this.nextPageURL!=null && this.nextPageURL!='')
      {
       this.linksscroll();
      }
      else{
        infiniteScroll.enable(false);
      }
      infiniteScroll.complete();
    }, 500);
  }
  linksscroll()
  {
     this.externallinks.linksscroll(this.nextPageURL).subscribe(
     (eventsscroll) => {
      this.eventScrollLists=eventsscroll.result.data;
      for (let i = 0; i < Object.keys(this.eventScrollLists).length; i++) {
        this.externalLinks.push(this.eventScrollLists[i]);
        }
      
       this.nextPageURL=eventsscroll.result.next_page_url;     
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
      }
    );
  }
   public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExternallinksPage');
  }

}
