import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { TruncateModule } from 'ng2-truncate';
import {RlTagInputModule} from 'angular2-tag-input';
import { Ng2CompleterModule } from "ng2-completer";
import {BrowserModule} from '@angular/platform-browser';
import { Ng2EmojiModule } from 'ng2-emoji';
import { NativeAudio,Geolocation } from 'ionic-native';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Diagnostic } from 'ionic-native';
import { CameraPreview, CameraPreviewRect } from 'ionic-native';
//import { Permissions } from '@ionic-native/android-permissions';
// import { CalendarModule } from 'ion2-calendar';
import { Calendar } from '@ionic-native/calendar';


import {MomentModule} from 'angular2-moment';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';


// import { Geolocation } from '@ionic-native';
//Venkatesh
import { LoginPage } from '../pages/login/login';
import { AppConfig } from '../providers/app-config';
import { LoginUser } from '../providers/login-user';
//import { ConnectionsService } from '../providers/connections-service';
//import { MessagesService } from '../providers/messages-service';
//import { JobBoardService } from '../providers/job-board-service';
//import { ServiceRequestService } from '../providers/service-request-service';
//import { BlogListService } from '../providers/blog-list-service';
//import { NewsService } from '../providers/news-service';
//import { EventsService } from '../providers/events-service';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ConnectionsPage } from '../pages/connections/connections';
import { JobboardPage } from '../pages/jobboard/jobboard';
import { SinglejobPage } from '../pages/singlejob/singlejob';
import { AppliedJobsPage } from '../pages/applied-jobs/applied-jobs';
import { MessagesPage } from '../pages/messages/messages';
import { CreateMessagePage } from '../pages/create-message/create-message';
import { ViewMessagesPage } from '../pages/view-messages/view-messages';
import { FirsttimeloginPagePage } from '../pages/firsttimelogin/firsttimelogin';


import { ServiceprovidersPage } from '../pages/serviceproviders/serviceproviders';
import { ServicerequestPage } from '../pages/servicerequest/servicerequest';
import { ViewServiceRequestPage } from '../pages/view-service-request/view-service-request';
import { BlogsPage } from '../pages/blogs/blogs';
import { SingleblogPage } from '../pages/singleblog/singleblog';
import { ShareBlogPagePage } from '../pages/share-blog/share-blog';
import { CreateBlogPage } from '../pages/create-blog/create-blog';
import { NewsPage } from '../pages/news/news';
import { ViewNewsPage } from '../pages/view-news/view-news';
import { EventsPage } from '../pages/events/events';
import { ViewEventsPage } from '../pages/view-events/view-events';
import { ExternallinksPage } from '../pages/externallinks/externallinks';
import { LogoutPage } from '../pages/logout/logout';
import { JobDependentPage } from '../pages/job-dependent/job-dependent';
import { ManageBlogsPage } from '../pages/manage-blogs/manage-blogs';
import { EmojiPickerPage } from '../pages/emoji-picker/emoji-picker';

// Kavitha
import { CommunitylistPage } from '../pages/communitylist/communitylist';
import { CommunityPage } from '../pages/community/community';
import { CommunityPopoverPage } from '../pages/community/community';
import { CommunityprofilePage } from '../pages/communityprofile/communityprofile';
import { CommunitymessagePage } from '../pages/communitymessage/communitymessage';
import { CommunitycommentsPage } from '../pages/communitycomments/communitycomments';

import { MyprofilesettingPage } from '../pages/myprofilesetting/myprofilesetting';
import { CommunitymembersPage } from '../pages/communitymembers/communitymembers';
import { PopoverPage } from '../pages/connections/connections';
import { BlogtabsPage } from '../pages/blogtabs/blogtabs';

import { ManagePage } from '../pages/manage/manage';

import { EldersPage } from '../pages/elders/elders';
import { CommunityServices } from '../providers/community-services';

//Sam
import { SubCategoryPage } from '../pages/sub-category/sub-category';
import { SubcategoryListPage } from '../pages/subcategory-list/subcategory-list';
import { InstantRequestModalPage } from '../pages/subcategory-list/subcategory-list';
import { ServiceInfoPage } from '../pages/service-info/service-info';
import { ServiceModalPage } from '../pages/service-modal/service-modal';
import { ModalContentPage } from '../pages/modal-page/modal-page';
import { Modelpage1PagePage } from '../pages/modelpage1/modelpage1';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { SettingsPage } from '../pages/settings/settings';
import { SubCategoryServicePage } from '../pages/sub-category-service/sub-category-service';
import { TermsModalPage } from '../pages/terms-modal/terms-modal';

import { Ionic2RatingModule } from 'ionic2-rating';
import { ServiceProvider } from '../providers/service-provider';
// import { Externallinks } from '../providers/externallinks';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    ConnectionsPage,
    CommunitylistPage,
    CommunityPage,
    CommunityPopoverPage,
    CommunityprofilePage,
    CommunitymessagePage,
    CommunitycommentsPage,
    MyprofilesettingPage,
    EmojiPickerPage,
    CommunitymembersPage,
    PopoverPage,
    ShareBlogPagePage,
    ManagePage,
    EldersPage,
    JobboardPage,
    SinglejobPage,
    AppliedJobsPage,
    MessagesPage,
    CreateMessagePage,
    ViewMessagesPage,
    ServiceprovidersPage,
    ServicerequestPage,
    ViewServiceRequestPage,
    BlogsPage,
    SingleblogPage,
    FirsttimeloginPagePage,
    CreateBlogPage,
    LogoutPage,
    JobDependentPage,
    ManageBlogsPage,
    BlogtabsPage,
    SubCategoryPage,
    SubCategoryServicePage,
    SubcategoryListPage,
    ServiceInfoPage,
    ModalContentPage,
    Modelpage1PagePage,
    InstantRequestModalPage,
    NewsPage,
    ViewNewsPage,
    EventsPage,
    ExternallinksPage,
    ViewEventsPage,
    ForgotPasswordPage,
    MyProfilePage,
    EditProfilePage,
    ChangePasswordPage,
    SettingsPage,
    ServiceModalPage,
    TermsModalPage
  ],
  imports: [

    IonicModule.forRoot(MyApp,AppConfig,{
       tabsHideOnSubPages:true
    }),

    TruncateModule,
    RlTagInputModule,
    Ionic2RatingModule,
    Ng2CompleterModule,
    BrowserModule,
    Ng2EmojiModule,
    MomentModule,
    // CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    ConnectionsPage,
    CommunitylistPage,
    CommunityprofilePage,
    CommunitymessagePage,
    CommunitycommentsPage,
    MyprofilesettingPage,
    EmojiPickerPage,
    CommunitymembersPage,
    PopoverPage,
    ShareBlogPagePage,
    BlogtabsPage, 
    CommunityPage,
    CommunityPopoverPage,
    ManagePage,
    EldersPage,
    JobboardPage,
    SinglejobPage,
    AppliedJobsPage,
    MessagesPage,
    CreateMessagePage,
    ViewMessagesPage,
    ServiceprovidersPage,
    ServicerequestPage,
    ViewServiceRequestPage,
    BlogsPage,
    SingleblogPage,
    FirsttimeloginPagePage,
    CreateBlogPage,
    LogoutPage,
    JobDependentPage,
    ManageBlogsPage,
    SubCategoryPage,
    SubCategoryServicePage,
    SubcategoryListPage,
    ServiceInfoPage,
    ModalContentPage,
    Modelpage1PagePage,
    InstantRequestModalPage,
    NewsPage,
    ViewNewsPage,
    EventsPage,
    ExternallinksPage,
    ViewEventsPage,
    ForgotPasswordPage,
    MyProfilePage,
    EditProfilePage,
    ChangePasswordPage,
    SettingsPage,
    ServiceModalPage,
    TermsModalPage
  ],

    //providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},LoginUser,CommunityServices,ConnectionsService,MessagesService,JobBoardService,BlogListService,NewsService,EventsService,AppConfig,ServiceProvider,ServiceRequestService,Storage] // Add GithubUsers provider
     providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Transfer,Calendar,FileChooser,FilePath,Diagnostic,CameraPreview,Geolocation,NativeGeocoder,NativeAudio,LoginUser,CommunityServices,ServiceProvider, AppConfig,Storage] // Add GithubUsers provider
})
export class AppModule {}
