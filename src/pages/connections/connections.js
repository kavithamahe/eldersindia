var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConnectionsService } from '../../providers/connections-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
/*
  Generated class for the Connections page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ConnectionsPage = (function () {
    function ConnectionsPage(navCtrl, navParams, storage, connectionsService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.connectionsService = connectionsService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.connections = "all";
        this.messages = "inbox";
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                // this.blogId=navParams.get("blogId");
                _this.onInit();
            });
        });
    }
    ConnectionsPage.prototype.onInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.connectionsService.allConnections().subscribe(function (allConnections) {
            _this.allConnectionsInfo = allConnections.result.info.list;
            _this.orgAllConnectionsInfo = allConnections.result.info.list;
            _this.nextURL = allConnections.result.info.list.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    ConnectionsPage.prototype.receivedRquest = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.connectionsService.receivedRquest().subscribe(function (receivedRquest) {
            _this.receivedRquestInfo = receivedRquest.result.info.list;
            _this.orgReceivedRquestInfo = receivedRquest.result.info.list;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    ConnectionsPage.prototype.connectionStatus = function (connectionId, status) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.connectionsService.connectionStatus(connectionId, status).subscribe(function (connectionStatus) {
            _this.showToaster(connectionStatus.result);
            _this.receivedRquest();
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
                _this.receivedRquest();
            }
            else {
                _this.showToaster("Try again later");
            }
        });
        loader.dismiss();
    };
    ConnectionsPage.prototype.search = function (searchEvent) {
        var _this = this;
        var term = searchEvent.target.value;
        /*if (term.trim() === '' || term.trim().length < 3) {
          this.allConnectionsInfo=this.orgAllConnectionsInfo;
        } else {*/
        // Get the searched users from github
        this.connectionsService.searchConnection(term).subscribe(function (searchConnection) {
            _this.allConnectionsInfo = searchConnection.result.info.list;
        });
        // }
    };
    ConnectionsPage.prototype.doInfinite1 = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        if (this.nextURL == null) {
            this.nextURL = "http://192.168.1.120:8000/api/receiveConnectionRequest?page=1";
        }
        this.connectionsService.infiniteRquest(this.nextURL).subscribe(function (infinitereceivedRquest) {
            _this.infiniteReceivedRquestInfo = infinitereceivedRquest.result.info.list.data;
            _this.nextURL = infinitereceivedRquest.result.info.list.next_page_url;
            console.log(_this.infiniteReceivedRquestInfo);
        }, function (err) {
            _this.infiniteReceivedRquestInfo = [];
        });
        setTimeout(function () {
            for (var i = 0; i < Object.keys(_this.infiniteReceivedRquestInfo).length; i++) {
                _this.receivedRquestInfo.data.push(_this.infiniteReceivedRquestInfo[i]);
                console.log(_this.infiniteReceivedRquestInfo[i]);
            }
            infiniteScroll.complete();
        }, 500);
    };
    ConnectionsPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ConnectionsPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    return ConnectionsPage;
}());
ConnectionsPage = __decorate([
    Component({
        templateUrl: 'connections.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, ConnectionsService, LoadingController, ToastController])
], ConnectionsPage);
export { ConnectionsPage };
//# sourceMappingURL=connections.js.map