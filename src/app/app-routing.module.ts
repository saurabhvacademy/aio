import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './sharedComponents/error404/error404.component';
import { Error400Component } from './sharedComponents/error400/error400.component';
import { Error500Component } from './sharedComponents/error500/error500.component';
import { UnsubscribeComponent } from './sharedComponents/unsubscribe/unsubscribe.component';
import { MobileblockComponent } from './sharedComponents/mobileblock/mobileblock.component';
import { BrowserCompatibilityComponent } from './sharedComponents/browser-compatibility/browser-compatibility.component';
import { LoginComponent } from './modules/login/login.component';




//import {MnavbarComponent} from '.sharedComponents/mnavbar/mnavbar.component';
// import {MmenuComponent} from './sharedComponents/mmenu/mmenu.component';

const routes: Routes = [

    {
        path: '404',
        component: Error404Component
    },

    {
        path: '400',
        component: Error400Component
    },
    {
        path: '500',
        component: Error500Component
    },
    {
        path: 'unavailable',
        component: MobileblockComponent
    },
    {
        path: 'browser',
        component: BrowserCompatibilityComponent
    },
    {
        path: 'unsubscribeMail',
        component: UnsubscribeComponent
    },
    // {
    //     path: 'mmenu',
    //     component:MmenuComponent
    // },
    //    {
    //        path: 'payment',
    //        component:PaymentpageComponent
    //    },
    //    {
    //        path: 'payment',
    //        loadChildren: './modules/checkout/checkout.module/paymentpage#paymentpage'
    //    },

    {
        path: 'verification',
        loadChildren: './sharedComponents/verificationpopup/verification.module#VerificationModule'
    },
    {
        path: 'article',
        loadChildren: './modules/article/article.module#ArticleModule'
    },

    //    {
    //        path: 'course',
    //        loadChildren: './modules/courses/courses.module#CoursesModule'
    //    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'career',
        loadChildren: './modules/career/career.module#CareerModule'

    },
    {
        path: 'campushiring',
        loadChildren: './modules/career/career.module#CareerModule'

    },
    {
        path: 'careers',
        loadChildren: './modules/career/career.module#CareerModule'

    },

    {
        path: 'viewer/:uuid',
        loadChildren: './modules/pdf-reader/pdf-reader.module#PdfReaderModule'
    },
    // {
    //     path: 'login/:id',
    //     loadChildren: './modules/login/login.module#LoginModule'
    // },
    // {
    //     path: 'learn/:interest',
    //     loadChildren: './modules/login/login.module#LoginModule'
    // },

    {
        path: 'liveclass/:id',
        loadChildren: './modules/liveclassinvite/liveclassinvite.module#LiveclassinviteModule'

    },

    {
        path: 'login',
        component: LoginComponent
    },
    // {
    //     path: 'program',
    //     component: ProgramComponent
    // },
    {
        path: 'program/nda',
        loadChildren: './modules/program/program.module#ProgramModule'
    },

    {
        path: 'payment/:id',
        loadChildren: './modules/checkout/checkout.module#CheckoutModule'
    },

    {
        path: 'payment',
        loadChildren: './modules/checkout/checkout.module#CheckoutModule'
    },

    {
        path: 'user/directory',
        loadChildren: './sharedComponents/directory/directory.module#DirectoryModule'
    },
    {
        path: 'home',
        loadChildren: './modules/wall/wall.module#WallModule'
    },
    {
        path: 'saved',
        loadChildren: './modules/saved/saved.module#SavedModule'
    },
    {
        path: 'profile',
        loadChildren: './modules/profile/profile.module#ProfileModule'
    },
    //    {
    //        path: 'profile/:id',
    //        loadChildren: './modules/profile/profile.module#ProfileModule'
    //    },
    {
        path: 'page/:tabid',
        loadChildren: './modules/page/pageprofile/page.module#PageModule'
    },
    {
        path: 'page/:tabid/:id',
        loadChildren: './modules/page/pageprofile/page.module#PageModule'
    },
    {
        path: 'page/:tabid/',
        loadChildren: './modules/page/pageprofile/page.module#PageModule'
    },
    {
        path: 'settings',
        loadChildren: './modules/settings/setting.module#SettingModule'
    },
    {
        path: 'inbox',
        loadChildren: './modules/inbox/inbox.module#InboxModule'
    },
    {
        path: 'inbox/:username',
        loadChildren: './modules/inbox/inbox.module#InboxModule'
    },
    {
        path: 'interest',
        loadChildren: './modules/interest/interest.module#InterestModule'
    },
    {
        path: 'post',
        loadChildren: './sharedComponents/postComponents/singlepostview/single.module#SingleModule'
    },
    {
        path: 'privacy',
        loadChildren: './sharedComponents/privacy/privacy.module#PrivacyModule'
    },
    {
        path: 'termandcondition',
        loadChildren: './sharedComponents/privacy/privacy.module#PrivacyModule'
    },
    {
        path: 'notification',
        loadChildren: './modules/notification/notification.module#NotificationModule'
    },
    {
        path: 'visitors',
        loadChildren: './modules/profile-visitors/profile-visitors.module#ProfileVisitorsModule'
    },
    {
        path: 'activitylog',
        loadChildren: './modules/activitylog/activitylog.module#ActivitylogModule'
    },
    {
        path: 'pageinbox/:pageuuid',
        loadChildren: './modules/page/message/messages.module#MessagesModule'
    },
    {
        path: 'addcourse/:id',
        loadChildren: './modules/addcourse/addcourse.module#AddcourseModule'
    },

    {
        path: 'reviewcourse/:id',
        loadChildren: './modules/addcourse/addcourse.module#AddcourseModule'
    },

    {
        path: 'addcourse',
        loadChildren: './modules/addcourse/addcourse.module#AddcourseModule'
    },

    {
        path: 'addcourse/quiz',
        loadChildren: './modules/addcourse/addcourse.module#AddcourseModule'
    },
    {
        path: 'course/:id',
        loadChildren: './modules/course-details/course-details.module#CourseDetailModule'
    },
    {
        path: 'coursedetail/:id',
        loadChildren: './modules/course-details/course-details.module#CourseDetailModule'
    },
    {
        path: 'test/:id',
        loadChildren: './modules/test/test.module#TestModule'
    },

    {
        path: 'addquiz/:id',
        loadChildren: './modules/addquiz/addquiz.module#AddquizModule'
    },
    {
        path: 'test',
        loadChildren: './modules/test/test.module#TestModule'
    },
    //    {
    //        path: 'searchresult/:id',
    //        loadChildren: './modules/search/search.module#SearchModule'
    //    },
    {
        path: 'searchresult/:tabid/:id',
        loadChildren: './modules/search/search.module#SearchModule'
    },
    {
        path: 'directory',
        loadChildren: './modules/list/list.module#ListModule'
    },
    // {
    //     path: 'directory/profile',
    //     component: PeopleListComponent
    // },
    // {
    //     path: 'directory/post',
    //     component: PostListComponent
    // },

    {
        path: 'wallet',
        loadChildren: './modules/wallet/wallet.module#WalletModule'
    },
    {
        //        path: 'livestream',
        path: 'livestream/:id',
        loadChildren: './modules/live-stream/livestream.module#LivestreamModule'
    },
    {
        path: 'mentorstream/:id',
        // path: 'mentorstream/:id',
        loadChildren: './modules/live-stream-admin/live-stream-admin.module#LiveStreamAdminModule'
    },
    {
        path: 'questionforyou',
        loadChildren: './modules/questionforyou/questionforyou.module#QuestionforyouModule'
    },
    {
        path: 'form',
        loadChildren: './modules/get-user-information/get-user-information.module#GetUserInformationModule'
    },
    // {
    //     path: 'form/thankyou',
    //     component: GetUserInformationComponent
    // },
    // {
    //     path: 'livestream',
    //     component: LivestreamComponent
    // },
    // {
    //     path: 'pointsystem',
    //     loadChildren: './modules/point-system/point-system.module#PointSystemModule'
    // },
    // {
    //     path: 'socketadmin',
    //     loadChildren: './modules/socketadmin/socketadmin.module#SocketadminModule'
    // },
    {
        path: 'scholarship',
        loadChildren: "./modules/scholarship-new/scholarship.module#ScholarshipModule"
    },
    {
        path: 'leaderboard',
        loadChildren: './modules/leaderboard/leaderboard.module#LeaderboardModule'
    },
    {
        path: 'pointsystem',
        loadChildren: './modules/point-system/point-system.module#PointSystemModule'
    },

    { path: 'all-courses', loadChildren: './modules/all-courses/all-courses.module#AllCoursesModule' },
    { path: 'vod-mentorstream/:id', loadChildren: './modules/vod-mentorstream/vod-mentorstream.module#VodMentorstreamModule' },
    { path: 'prepare', loadChildren: './modules/prepare/prepare.module#PrepareModule' },

    { path: 'live-classes', loadChildren: './modules/live-classes/live-classes.module#LiveClassesModule' },
    // { path: 'prepare/:id', loadChildren: './modules/prepare/prepare.module#PrepareModule'},
    {
        path: '**',
        redirectTo: 'home'
    }






];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
// {preloadingStrategy: PreloadAllModules}
