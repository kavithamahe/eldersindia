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
import { SingleblogPage } from '../../pages/singleblog/singleblog';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { CreateBlogPage } from '../../pages/create-blog/create-blog';
import { ManageBlogsPage } from '../../pages/manage-blogs/manage-blogs';
/*
  Generated class for the Blogs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var BlogsPage = (function () {
    function BlogsPage(navCtrl, navParams, storage, blogListService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.blogListService = blogListService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                _this.blog();
            });
        });
    }
    BlogsPage.prototype.blog = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.blogListService.blogList().subscribe(function (blogsList) {
            _this.bloglists = blogsList.result.data;
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
    BlogsPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    BlogsPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    BlogsPage.prototype.viewBlog = function (blogId) {
        this.navCtrl.push(SingleblogPage, { blogId: blogId });
    };
    BlogsPage.prototype.createBlog = function () {
        this.navCtrl.push(CreateBlogPage);
    };
    BlogsPage.prototype.manageBlog = function () {
        this.navCtrl.push(ManageBlogsPage);
    };
    return BlogsPage;
}());
BlogsPage = __decorate([
    Component({
        selector: 'page-blogs',
        templateUrl: 'blogs.html',
        providers: [BlogListService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, BlogListService, LoadingController, ToastController])
], BlogsPage);
export { BlogsPage };
//# sourceMappingURL=blogs.js.map