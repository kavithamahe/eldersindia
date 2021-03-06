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
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CommunityprofilePage } from '../../pages/communityprofile/communityprofile';
import { ConnectionsService } from '../../providers/connections-service';
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
        this.token = '';
        this.allConnectionsInfo = [];
        this.receivedRquestInfo = [];
        this.sentRquestInfo = [];
        this.addConnectionInfo = [];
        this.orgReceivedRquestInfo = [];
        this.connectionStatusInfo = [];
        this.orgAllConnectionsInfo = [];
        this.infiniteReceivedRquestInfo = [];
        this.nextPageURL1 = '';
        this.nextPageURL2 = '';
        this.nextPageURL3 = '';
        this.nextPageURL4 = '';
        this.allConnectionScrollLists = [];
        this.receivedConnectionScrollLists = [];
        this.getconnections = "myConnections";
        if (navParams.get("notification") == 'connection_request') {
            this.connections = "received";
        }
        else {
            this.connections = "all";
        }
        this.messages = "inbox";
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('id').then(function (id) {
                _this.user_id = id;
            });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.onInit();
            });
        });
    }
    ConnectionsPage.prototype.onInit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.connectionsService.allConnections().subscribe(function (allConnections) {
            _this.allConnectionsInfo = allConnections.result.info.list.data;
            _this.orgAllConnectionsInfo = allConnections.result.info.list.data;
            _this.nextPageURL1 = allConnections.result.info.list.next_page_url;
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
            _this.receivedRquestInfo = receivedRquest.result.info.list.data;
            _this.orgReceivedRquestInfo = receivedRquest.result.info.list.data;
            _this.nextPageURL2 = receivedRquest.result.info.list.next_page_url;
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
    ConnectionsPage.prototype.sentRquest = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.connectionsService.sentRquest().subscribe(function (sentRquest) {
            _this.sentRquestInfo = sentRquest.result.info.list.data;
            _this.nextPageURL4 = sentRquest.result.info.list.next_page_url;
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
    ConnectionsPage.prototype.addConnectionsList = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.connectionsService.getAllConnectionList().subscribe(function (addConnectionsList) {
            _this.addConnectionInfo = addConnectionsList.result.info.data;
            _this.nextPageURL3 = addConnectionsList.result.info.next_page_url;
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
        this.connectionsService.searchConnection(term).subscribe(function (searchConnection) {
            _this.allConnectionsInfo = searchConnection.result.info.list.data;
        });
    };
    ConnectionsPage.prototype.search1 = function (Event) {
        var _this = this;
        var term = Event.target.value;
        this.connectionsService.addsearchConnection(term).subscribe(function (searchConnections) {
            _this.addConnectionInfo = searchConnections.result.info.data;
        });
    };
    ConnectionsPage.prototype.connectMember = function (connect_id, connect_name) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.connectionsService.sendConnectionRequest(connect_id, connect_name).subscribe(function (connectionMember) {
            _this.showToaster(connectionMember.result.info);
            _this.addConnectionsList();
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
    ConnectionsPage.prototype.doInfinite2 = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL2 != null && _this.nextPageURL2 != '') {
                _this.receivedConnectionScroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    ConnectionsPage.prototype.receivedConnectionScroll = function () {
        var _this = this;
        this.connectionsService.receivedConnectionScroll(this.nextPageURL2).subscribe(function (receivedConnectionScroll) {
            _this.receivedConnectionScrollLists = receivedConnectionScroll.result.info.list.data;
            // console.log(this.allConnectionScrollLists);
            for (var i = 0; i < Object.keys(_this.receivedConnectionScrollLists).length; i++) {
                _this.receivedRquestInfo.push(_this.receivedConnectionScrollLists[i]);
                // this.orgAllConnectionsInfo.push(this.allConnectionScrollLists[i]);
            }
            _this.nextPageURL2 = receivedConnectionScroll.result.info.list.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    ConnectionsPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ConnectionsPage.prototype.CommunityUserWall = function (profile_uid) {
        console.log(profile_uid);
        this.navCtrl.setRoot(CommunityprofilePage, { profile_uid: profile_uid });
    };
    ConnectionsPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    ConnectionsPage.prototype.doInfinite1 = function (infiniteScroll) {
        var _this = this;
        console.log(this.allConnectionsInfo);
        setTimeout(function () {
            if (_this.nextPageURL1 != null && _this.nextPageURL1 != '') {
                _this.allConnectionScroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    ConnectionsPage.prototype.allConnectionScroll = function () {
        var _this = this;
        this.connectionsService.allConnectionScroll(this.nextPageURL1).subscribe(function (allConnectionScroll) {
            _this.allConnectionScrollLists = allConnectionScroll.result.info.list.data;
            // console.log(this.allConnectionScrollLists);
            for (var i = 0; i < Object.keys(_this.allConnectionScrollLists).length; i++) {
                _this.allConnectionsInfo.push(_this.allConnectionScrollLists[i]);
                // this.orgAllConnectionsInfo.push(this.allConnectionScrollLists[i]);
            }
            _this.nextPageURL1 = allConnectionScroll.result.info.list.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    ConnectionsPage.prototype.doInfinite3 = function (infiniteScroll) {
        var _this = this;
        console.log(this.allConnectionsInfo);
        setTimeout(function () {
            if (_this.nextPageURL3 != null && _this.nextPageURL3 != '') {
                _this.addConnectionScroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    ConnectionsPage.prototype.addConnectionScroll = function () {
        var _this = this;
        this.connectionsService.addConnectionScroll(this.nextPageURL3).subscribe(function (addConnectionScroll) {
            _this.allConnectionScrollLists = addConnectionScroll.result.info.data;
            // console.log(this.allConnectionScrollLists);
            for (var i = 0; i < Object.keys(_this.allConnectionScrollLists).length; i++) {
                _this.addConnectionInfo.push(_this.allConnectionScrollLists[i]);
                // this.orgAllConnectionsInfo.push(this.allConnectionScrollLists[i]);
            }
            _this.nextPageURL3 = addConnectionScroll.result.info.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    ConnectionsPage.prototype.doInfinite4 = function (infiniteScroll) {
        var _this = this;
        console.log(this.allConnectionsInfo);
        setTimeout(function () {
            if (_this.nextPageURL4 != null && _this.nextPageURL4 != '') {
                _this.sentRequestScroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    ConnectionsPage.prototype.sentRequestScroll = function () {
        var _this = this;
        this.connectionsService.sentRequestScroll(this.nextPageURL4).subscribe(function (sentRequestScroll) {
            _this.allConnectionScrollLists = sentRequestScroll.result.info.list.data;
            // console.log(this.allConnectionScrollLists);
            for (var i = 0; i < Object.keys(_this.allConnectionScrollLists).length; i++) {
                _this.sentRquestInfo.push(_this.allConnectionScrollLists[i]);
                // this.orgAllConnectionsInfo.push(this.allConnectionScrollLists[i]);
            }
            _this.nextPageURL4 = sentRequestScroll.result.info.list.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    return ConnectionsPage;
}());
ConnectionsPage = __decorate([
    Component({
        templateUrl: 'connections.html',
        providers: [ConnectionsService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, ConnectionsService, LoadingController, ToastController])
], ConnectionsPage);
export { ConnectionsPage };
//# sourceMappingURL=connections.js.map