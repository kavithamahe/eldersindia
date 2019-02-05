import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

export enum ConnectionStatusEnum {
    Online,
    Offline
}


@Injectable()
export class NetworkProvider {

  previousStatus;
  network_type:any;

  constructor(public alertCtrl: AlertController, 
              public network: Network,
              public eventCtrl: Events,public storage:Storage,) {
    console.log('Hello NetworkProvider Provider');
    this.previousStatus = ConnectionStatusEnum.Online;
    
  }

    public initializeNetworkEvents(): void {
        this.network.onDisconnect().subscribe(data => {
          this.network_type = data.type;
          this.storage.set('network_type', this.network_type);
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(data => {
          this.network_type = data.type;
          this.storage.set('network_type', this.network_type);
            if (this.previousStatus === ConnectionStatusEnum.Offline) {
                this.eventCtrl.publish('network:online');
            }
            this.previousStatus = ConnectionStatusEnum.Online;
        });
    }

}