import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MessagesService } from '../../providers/messages-service';
import { CommunityprofilePage } from '../../pages/communityprofile/communityprofile';
import { CreateMessagePage } from '../../pages/create-message/create-message';

/*
  Generated class for the ViewMessages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-messages',
  templateUrl: 'view-messages.html',
  providers:[MessagesService]
})
export class ViewMessagesPage {
messages:any;
token:string;
imageUrl:string;
veiwMessagesInfo:any;
messageId:any;
toAddress:any;
subject:any;
message:any;
viewType:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public messagesService:MessagesService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  	this.messages="inbox";
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      this.messageId=navParams.get("messageId");
      this.viewType=navParams.get("viewType");
  		this.onInit(this.messageId,this.viewType);
      })
  	});
  }
  onInit(messageId,viewType)
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.viewMessages(messageId,viewType).subscribe(
     (viewMessages) => {
      this.veiwMessagesInfo=viewMessages.result.details;  
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
    loader.dismiss();
  }
  public dashboardPage()
  {
    this.navCtrl.setRoot(DashboardPage);
  }
  showToaster(message)
  {
   let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
        });
   toast.present();
  }
  public CommunityUserWall(profile_uid)
  {
    this.navCtrl.setRoot(CommunityprofilePage,{profile_uid});
  }
  public messageReply(to,subject)
  {
    let msgObject={"to":to,"subject":subject};
    this.navCtrl.setRoot(CreateMessagePage,msgObject);
  }
}
