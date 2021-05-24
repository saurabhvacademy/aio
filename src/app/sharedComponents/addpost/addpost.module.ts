import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddpostComponent } from './addpost.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationpopupModule } from './../../componentHost/confirmationpopup.module';
import { PostotherviewModule } from './../../componentHost/postotherview.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CoursepostComponent } from './../postComponents/coursepost/coursepost.component';
import { SharescreencoursepostviewComponent } from './../postComponents/sharescreencoursepostview/sharescreencoursepostview.component';
import { SharedcoursepostComponent } from './../postComponents/sharedcoursepost/sharedcoursepost.component';
import { NewsfeedComponent } from './../newsfeed/newsfeed.component';
import { SharedvideopostComponent } from './../postComponents/sharedvideopost/sharedvideopost.component';
import { SharedmultiplechoicepostComponent } from './../postComponents/sharedmultiplechoicepost/sharedmultiplechoicepost.component';
import { SharedsinglechoicepostComponent } from './../postComponents/sharedsinglechoicepost/sharedsinglechoicepost.component';
import { SharedtruefalsepostComponent } from './../postComponents/sharedtruefalsepost/sharedtruefalsepost.component';
import { TruefalsepostComponent } from './../postComponents/truefalsepost/truefalsepost.component';
import { MultiplechoicepostComponent } from './../postComponents/multiplechoicepost/multiplechoicepost.component';
import { SinglechoicepostComponent } from './../postComponents/singlechoicepost/singlechoicepost.component';
import { SubcommentComponent } from './../postComponents/subcommentView/subcomment.component';
import { SharedfileattachmentComponent } from './../postComponents/sharedfileattachment/sharedfileattachment.component';
import { SharedimagepostComponent } from './../postComponents/sharedimagepost/sharedimagepost.component';
import { SharedlinkpostComponent } from './../postComponents/sharedlinkpost/sharedlinkpost.component';
import { CommentComponent } from './../postComponents/commentView/comment.component';
import { LinkpostComponent } from './../postComponents/linkpost/linkpost.component';
import { TextpostComponent } from './../postComponents/textpost/textpost.component';
import { ImagepostComponent } from './../postComponents/imagepost/imagepost.component';
import { VideopostComponent } from './../postComponents/videopost/videopost.component';
import { SharedpostComponent } from './../postComponents/sharedpost/sharedpost.component';
import { FileattachmentpostComponent } from './../postComponents/fileattachmentpost/fileattachmentpost.component';
import { ReportsComponent } from './../../sharedComponents/reports/reports.component';
import { ImageviewComponent } from './../../sharedComponents/imageview/imageview.component';
import { TextposteditComponent } from './../../sharedComponents/textpostedit/textpostedit.component';
import { LikeshareviewallModule } from './../postComponents/likeshareviewall/likeshareviewall.module';
import { SharescreenfileattachmentComponent } from './../../sharedComponents/postComponents/sharescreenfileattachment/sharescreenfileattachment.component';
import { SharescreenmultiplechoicepostComponent } from './../../sharedComponents/postComponents/sharescreenmultiplechoicepost/sharescreenmultiplechoicepost.component';
import { SharescreentruefalsepostComponent } from './../../sharedComponents/postComponents/sharescreentruefalsepost/sharescreentruefalsepost.component';
import { SharescreensinglechoicepostComponent } from './../../sharedComponents/postComponents/sharescreensinglechoicepost/sharescreensinglechoicepost.component';
import { SavedpopupComponent } from './../../sharedComponents/savedpopup/savedpopup.component';
import { SharetextpostviewComponent } from './../../sharedComponents/postComponents/sharetextpostview/sharetextpostview.component';
import { ShareimagepostviewComponent } from './../../sharedComponents/postComponents/shareimagepostview/shareimagepostview.component';
import { SharelinkpostviewComponent } from './../../sharedComponents/postComponents/sharelinkpostview/sharelinkpostview.component';
import { SharescreenvideopostComponent } from './../../sharedComponents/postComponents/sharescreenvideopost/sharescreenvideopost.component';
import { DocumentviewerComponent } from './../../sharedComponents/documentviewer/documentviewer.component';
import { TrendingComponent } from './../../sharedComponents/trending/trending.component';
import { LikedetailsComponent } from './../../sharedComponents/likedetails/likedetails.component';
import { TrimdataModule } from './../../componentHost/trimdata.module';
import { DateviewModule } from './../../componentHost/dateview.module';
import { SafepipeModule } from './../../componentHost/safepipe.module';
import { CapitalizeModule } from './../../componentHost/capitalize.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MpeopleyouknowModule } from './../../sharedComponents/mpeopleyouknow/mpeopleyouknow.module';
import { SocialinviteModule } from './../../sharedComponents/socialinvite/socialinvite.module';
import { MnavbarModule } from './../mnavbar/mnavbar.module';
import { MmenuModule } from './../mmenu/mmenu.module';
import { FbshareComponent } from './../fbshare/fbshare.component';
import { SharelinkedinComponent } from './../sharelinkedin/sharelinkedin.component';
import { SharetwiterComponent } from './../sharetwiter/sharetwiter.component';
import { LoginpopupModule } from '../loginpopup/loginpopup.module';
import { PostSolutionHintComponent } from './../../sharedComponents/postComponents/post-solution-hint/post-solution-hint.component';
import { AddSolutionComponent } from './add-solution/add-solution.component';
import { LocalDataService } from 'src/app/services/local-data.service';
import { PostComponent } from '../postComponents/post/post.component';
import { PostHeaderComponent } from '../postComponents/post-header/post-header.component';
import { PostFooterComponent } from '../postComponents/post-footer/post-footer.component';
import { SharedPostComponent } from '../postComponents/post/shared-post/shared-post.component';
import { SharedPostScreenComponent } from '../postComponents/post/shared-post-screen/shared-post-screen.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        InfiniteScrollModule, MpeopleyouknowModule, MnavbarModule, MmenuModule,
        CommonModule, InfiniteScrollModule, ConfirmationpopupModule, RouterModule,
        FormsModule, PostotherviewModule, SocialinviteModule,
        TrimdataModule, DateviewModule, SafepipeModule, CapitalizeModule, LikeshareviewallModule, PerfectScrollbarModule, LoginpopupModule
    ],

    declarations: [
        AddpostComponent, NewsfeedComponent, ReportsComponent,
        SharedvideopostComponent, ImageviewComponent,
        SharedmultiplechoicepostComponent, TextposteditComponent,
        SharedsinglechoicepostComponent,
        SharedtruefalsepostComponent, LikedetailsComponent,
        TruefalsepostComponent, SharescreenfileattachmentComponent,
        MultiplechoicepostComponent, SharescreensinglechoicepostComponent,
        SinglechoicepostComponent, SharescreentruefalsepostComponent,
        SubcommentComponent, SharescreenmultiplechoicepostComponent,
        SharedfileattachmentComponent, SavedpopupComponent,
        SharedimagepostComponent,
        SharedlinkpostComponent, SharetextpostviewComponent,
        CommentComponent, ShareimagepostviewComponent,
        LinkpostComponent, SharelinkpostviewComponent,
        TextpostComponent, SharescreenvideopostComponent,
        ImagepostComponent, DocumentviewerComponent,
        VideopostComponent, PostSolutionHintComponent,
        SharedpostComponent, TrendingComponent,
        FileattachmentpostComponent, CoursepostComponent, SharedcoursepostComponent,
        SharescreencoursepostviewComponent, FbshareComponent, SharelinkedinComponent, SharetwiterComponent, AddSolutionComponent, PostComponent, PostHeaderComponent,PostFooterComponent, SharedPostComponent, SharedPostScreenComponent

    ],
    exports: [
        AddpostComponent, NewsfeedComponent, ReportsComponent,
        SharedvideopostComponent, ImageviewComponent,
        SharedmultiplechoicepostComponent, TextposteditComponent,
        SharedsinglechoicepostComponent,
        SharedtruefalsepostComponent, LikedetailsComponent,
        TruefalsepostComponent, SharescreenfileattachmentComponent,
        MultiplechoicepostComponent, SharescreensinglechoicepostComponent,
        SinglechoicepostComponent, SharescreentruefalsepostComponent,
        SubcommentComponent, SharescreenmultiplechoicepostComponent,
        SharedfileattachmentComponent, SavedpopupComponent,
        SharedimagepostComponent,
        SharedlinkpostComponent, SharetextpostviewComponent,
        CommentComponent, ShareimagepostviewComponent,
        LinkpostComponent, SharelinkpostviewComponent,
        TextpostComponent, SharescreenvideopostComponent,
        ImagepostComponent, DocumentviewerComponent,
        VideopostComponent,
        SharedpostComponent,
        FileattachmentpostComponent,
        CoursepostComponent,PostComponent,PostHeaderComponent,PostFooterComponent, SharedPostComponent, SharedPostScreenComponent
    ],
    entryComponents: [
        SharedvideopostComponent,
        SharedmultiplechoicepostComponent,
        SharedsinglechoicepostComponent,
        SharedtruefalsepostComponent,
        SharedcoursepostComponent,
        TruefalsepostComponent,
        MultiplechoicepostComponent,
        SinglechoicepostComponent,
        SubcommentComponent,
        SharedfileattachmentComponent,
        SharedimagepostComponent,
        SharedlinkpostComponent,
        CommentComponent,
        LinkpostComponent,
        TextpostComponent,
        ImagepostComponent,
        VideopostComponent,
        SharedpostComponent,
        FileattachmentpostComponent,
        CoursepostComponent, PostComponent,PostHeaderComponent,PostFooterComponent, SharedPostComponent,SharedPostScreenComponent
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    LocalDataService
]
})
export class AddpostModule { }
