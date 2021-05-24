import {Component, OnInit, AfterViewInit} from '@angular/core';
import {PostdataService} from './../../../../services/postdata.service';
import {ConstantService} from './../../../../services/constant.service';

@Component({
    selector: 'app-review-comment',
    templateUrl: './review-comment.component.html',
    styleUrls: ['./review-comment.component.scss','./newreview-comment.component.scss']
})
export class ReviewCommentComponent implements OnInit {
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
        private postData: PostdataService
    ) {}

    ngOnInit() {
        this.full_name = this.arr['USER_FULL_NAME'];
        this.u_name = this.arr['USER_NAME'];
        this.parentId = this.arr['PARENT_ID'];
        this.comment_data = this.postData.decodeURIPostData((this.arr['TEXT']));
        if (this.arr['PROFILE_PHOTO_PATH'] != null && this.arr['PROFILE_PHOTO_PATH'] != '' ) {
            this.profile_pic_path = this.arr['PROFILE_PHOTO_PATH'] + "profile/" + this.arr['USER_OLD_ID'] + "_60x60.png";
        } else {
            this.profile_pic_path = this._constantService.defaultImgPath;
        }
        
    }
    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
}
