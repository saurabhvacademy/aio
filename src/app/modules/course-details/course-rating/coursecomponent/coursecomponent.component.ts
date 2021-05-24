import {Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {PostdataService} from './../../../../services/postdata.service';
import {ConstantService} from './../../../../services/constant.service';
import {EncryptionService} from './../../../../services/encryption.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-coursecomponent',
    templateUrl: './coursecomponent.component.html',
    styleUrls: ['./../../../../sharedComponents/postComponents/commentView/comment.component.scss', './../../../../sharedComponents/postComponents/commentView/newcomment.component.scss']
})
export class CoursecomponentComponent implements OnInit {
    u_id: any;
    commentEditStatus: boolean = false;
    _ref: any;
    ref: any;
    lastReplyOnCommentId: any;
    replyOncommentPresent: boolean = false;
    factory;
    @ViewChild('container', {read: ViewContainerRef}) container;
    c_data: any;
    replycount: any;
    uuid: string;
    file_path: string;
    showEnterReply: boolean;
    hideSpan: number;
    replycomment_image: any;
    showCommentImg: number;
    showAddReplyOnComment: boolean;
    CORS_RW_COMUUID: any;
    cors_rw_trng_uuid: any;
    openConfirmation: boolean = false;
    dataConf = {};
    arr: any;
    full_name: string;
    u_name: string;
    parentId;
    commentId;
    postId = 0;
    comment_data: string;
    profile_pic_path: string;
    subCommentStatus: any;
    
    constructor(
        public _constantService: ConstantService,
        public postData: PostdataService,
        public _encryptionServices: EncryptionService,
        public _router: Router,
        public componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    ngOnInit() {

        this.full_name = this.arr['USER_FULL_NAME'];
        this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'];
        this.comment_data = this.postData.decodeURIPostData(this.arr['TEXT']);
        this.cors_rw_trng_uuid = this.arr['cors_rw_rating_uuid'];
        this.CORS_RW_COMUUID = this.arr['COURSE_REVIEWS_RATINGS_COMMENT_UUID'];
        this.u_id = this.arr['USER_ID'];

    }
    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }

    gotoCourseCreateSection() {

    }

    delCmmntOnReview(event) {
        var comment = {};
        comment['token'] = this._constantService.getSessionDataBYKey('token');
        comment['token_param'] = {};
        comment['token_param']['device_type'] = 'w';
        comment['token_param']['host'] = '';
        comment['cors_rw_cmmnt_uuid'] = this.CORS_RW_COMUUID;
        comment['cors_rw_rating_uuid'] = this.cors_rw_trng_uuid;

        

        this._constantService.fetchDataApi(this._constantService.delCmmntOnReview(),comment).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                var count = (<HTMLElement> document.getElementById("comm_id" + this.CORS_RW_COMUUID));
                if (count != null) {
                    if (parseInt(count.innerHTML) == 1) {
                        count.style.display = 'none';
                        count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                    } else {
                        count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                    }
                }
                var count = (<HTMLElement> document.getElementById('comm_id_' + this.cors_rw_trng_uuid));
                if (count != null) {
                    if (parseInt(count.innerHTML) == 1) {
                        count.style.display = 'none';
                        count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                    } else {
                        count.innerHTML = (parseInt(count.innerHTML) - 1).toString();
                    }
                }
                this._ref.destroy();
            }
            else if (status == this._constantService.error_token) {
                this._constantService.clearUserInfo();
                this._router.navigate(['']);
                this.dataConf['type'] = 4;
                this.dataConf['msg'] = "Session Expire";
                this.dataConf['error_msg'] = "Session Expired";
                this.openConfirmation = true;
            } else {
                this.dataConf['type'] = 2;
                this.dataConf['msg'] = "STUDY24X7";
                this.dataConf['error_msg'] = responseData.ERROR_MSG;
                this.openConfirmation = true;
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    confirmText(value, event) {
        event.preventDefault();
        event.stopPropagation();
        //   this.c_data = value;

    }


    commentEditPopup() {
        this.commentEditStatus = !this.commentEditStatus;
    }
    closePopup($event) {
        this.openConfirmation = false;
    }


}
