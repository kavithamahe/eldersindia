import { Component, Input } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController,ToastController,Platform,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { MessagesService } from '../../providers/messages-service';

import { CommunityprofilePage } from '../../pages/communityprofile/communityprofile';
import { CreateMessagePage } from '../../pages/create-message/create-message';
import { MessagesPage } from '../../pages/messages/messages';
import { InAppBrowser } from 'ionic-native';
declare var cordova: any;

import moment from 'moment';

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
 @Input('progress') progress;
messages:any;
token:string;
imageUrl:string;
veiwMessagesInfo:any=[];
attachmentInfo:any=[];
file_path:any;
messageId:any;
toAddress:any;
subject:any;
message:any;
viewType:any;
rootUrl:any;
downloadProgress:any;
created_at:any;
  constructor(public platform: Platform,private transfer: FileTransfer,private filePath: FilePath,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public alertCtrl:AlertController,public modalCtrl: ModalController,public messagesService:MessagesService,public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
  //	this.messages="inbox";
  	this.storage.ready().then(() => {
  	  storage.get('imageurl').then((imageurl) => { this.imageUrl=imageurl;});
      storage.get('token').then((token) => { this.token=token; 
      this.messageId=navParams.get("messageId");
      this.viewType=navParams.get("viewType");
  		this.onInit(this.messageId,this.viewType);
      })
      storage.get('rooturl').then((rooturl) => { this.rootUrl=rooturl; 
      });

  	});
  }

  onInit(messageId,viewType)
  {
  	let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.viewMessages(messageId,viewType).subscribe(
     (viewMessages) => {
      this.veiwMessagesInfo=viewMessages.result.details;
          this.created_at = moment(viewMessages.result.details.created_at).format("DD MMM YY HH:mm");
        console.log(this.created_at);
      this.attachmentInfo=viewMessages.result.attachments;
      console.log(this.attachmentInfo.length);
      loader.dismiss(); 
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      });    
  }
 downloadFile(file_path,file_name) {
        this.platform.ready().then(() => {
            
  const fileTransfer: FileTransferObject = this.transfer.create();
  const url = this.imageUrl + file_path;

   var targetPath = cordova.file.externalRootDirectory + file_name;

cordova.plugins.DownloadManager.download(url,targetPath);
  fileTransfer.download(url, targetPath,  true ).then((entry) => {
   this.showToaster("Downloaded Succesfully"); 
  },
   (error) => {
    console.log("error");
  }); 

         });

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
    this.navCtrl.push(CommunityprofilePage,{profile_uid});
  }
  public messageReply(to,subject,sender_id)
  {
    let msgObject={"to":to,"subject":subject,"id":sender_id,msgType:"reply"};
   // this.navCtrl.setRoot(CreateMessagePage,msgObject);
    this.navCtrl.push(CreateMessagePage,msgObject);
  }
  public messageForward(subject,message)
  {
    console.log(this.attachmentInfo);
    let msgObject={"filename":this.attachmentInfo,"subject":subject,"message":message,msgType:"forward"};
    this.navCtrl.push(CreateMessagePage,msgObject);
  }
  deleteMessage(messageId,viewType)
  {
     let loader = this.loadingCtrl.create({ content: "Please wait..." });     
    loader.present();
    this.messagesService.deleteMessage(messageId,viewType).subscribe(
     (deleteMessage) => {
       this.showToaster(deleteMessage.result);
      let viewObj={"viewType":viewType}; 
      this.navCtrl.setRoot(MessagesPage,viewObj);
      loader.dismiss();
    },
    (err) => { 
        if(err.status===401)
        {
          this.showToaster(JSON.parse(err._body).error);
        }
        else
        {
          this.showToaster("Something went wrong");
        }
        loader.dismiss();
      }
    );
    
  }

}
