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
import { BlogListService } from '../../providers/blog-list-service';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateBlogPage } from '../../pages/create-blog/create-blog';
/*
  Generated class for the ManageBlogs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ManageBlogsPage = (function () {
    function ManageBlogsPage(navCtrl, navParams, storage, blogListService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.blogListService = blogListService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.manageblogsLists = [];
        this.blogStatus = [];
        this.nextPageURL = '';
        this.manageBlogscrollLists = [];
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.manageblogs();
            });
        });
    }
    ManageBlogsPage.prototype.manageblogs = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.blogListService.manageblogs().subscribe(function (manageblogs) {
            _this.manageblogsLists = manageblogs.result.list.data;
            _this.blogStatus = manageblogs.result.status;
            _this.nextPageURL = manageblogs.result.list.next_page_url;
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
    ManageBlogsPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    ManageBlogsPage.prototype.deleteBlog = function (blogId) {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.blogListService.deleteBlog(blogId).subscribe(function (manageblogs) {
            _this.showToaster(manageblogs.result);
            _this.manageblogs();
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
    ManageBlogsPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    ManageBlogsPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            if (_this.nextPageURL != null && _this.nextPageURL != '') {
                _this.manageBlogscroll();
            }
            else {
                infiniteScroll.enable(false);
            }
            infiniteScroll.complete();
        }, 500);
    };
    ManageBlogsPage.prototype.manageBlogscroll = function () {
        var _this = this;
        this.blogListService.manageBlogscroll(this.nextPageURL).subscribe(function (manageBlogscroll) {
            _this.manageBlogscrollLists = manageBlogscroll.result.list.data;
            for (var i = 0; i < Object.keys(_this.manageBlogscrollLists).length; i++) {
                _this.manageblogsLists.push(_this.manageBlogscrollLists[i]);
            }
            _this.nextPageURL = manageBlogscroll.result.list.next_page_url;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    ManageBlogsPage.prototype.editBlog = function (blogId, action) {
        var editObj = { "blogId": blogId, "action": action };
        this.navCtrl.push(CreateBlogPage, editObj);
    };
    return ManageBlogsPage;
}());
ManageBlogsPage = __decorate([
    Component({
        selector: 'page-manage-blogs',
        templateUrl: 'manage-blogs.html',
        providers: [BlogListService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, BlogListService, LoadingController, ToastController])
], ManageBlogsPage);
export { ManageBlogsPage };
//# sourceMappingURL=manage-blogs.js.map