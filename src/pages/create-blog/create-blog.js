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
/*
  Generated class for the CreateBlog page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CreateBlogPage = (function () {
    function CreateBlogPage(navCtrl, navParams, storage, blogListService, loadingCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.blogListService = blogListService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.tags = ['Pizza', 'Pasta', 'Parmesan'];
        this.storage.ready().then(function () {
            storage.get('imageurl').then(function (imageurl) { _this.imageUrl = imageurl; });
            storage.get('token').then(function (token) {
                _this.token = token;
                // this.blogId=navParams.get("blogId");
                _this.getBlogCategories();
            });
        });
    }
    CreateBlogPage.prototype.dashboardPage = function () {
        this.navCtrl.setRoot(DashboardPage);
    };
    CreateBlogPage.prototype.getBlogCategories = function () {
        var _this = this;
        this.blogListService.getBlogCategory().subscribe(function (getBlogCategories) {
            _this.categoriesList = getBlogCategories.result;
        }, function (err) {
            if (err.status === 401) {
                _this.showToaster(JSON.parse(err._body).error);
            }
            else {
                _this.showToaster("Try again later");
            }
        });
    };
    CreateBlogPage.prototype.createBlog = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({ content: "Please wait..." });
        loader.present();
        this.blogObject = { "category": this.category, "allow_comment": this.allowComments, "title": this.title, "highlights": this.highlights,
            "description": this.description, "featured_image": "", "banner_image": "", "tags[0][id]": "2",
            "tags[0][name]": "Healthcare", "tags[1][name]": "hai" };
        this.blogListService.createBlog(this.blogObject).subscribe(function (createBlog) {
            _this.showToaster(createBlog.result);
            //console.log(createBlog.result);
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
    CreateBlogPage.prototype.showToaster = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    return CreateBlogPage;
}());
CreateBlogPage = __decorate([
    Component({
        selector: 'page-create-blog',
        templateUrl: 'create-blog.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Storage, BlogListService, LoadingController, ToastController])
], CreateBlogPage);
export { CreateBlogPage };
//# sourceMappingURL=create-blog.js.map