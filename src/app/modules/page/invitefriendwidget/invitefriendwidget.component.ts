import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { ConstantService } from "./../../../services/constant.service";
import { PostdataService } from "./../../../services/postdata.service";
import { EncryptionService } from "./../../../services/encryption.service";
import {
  PerfectScrollbarDirective,
  PerfectScrollbarComponent,
} from "ngx-perfect-scrollbar";

@Component({
  selector: "app-invitefriendwidget",
  templateUrl: "./invitefriendwidget.component.html",
  styleUrls: [
    "./invitefriendwidget.component.scss",
    "./../../../sharedComponents/peopleyouknow/peopleyouknow.component.scss",
  ],
})
export class InvitefriendwidgetComponent implements OnInit {
  config: string;

  @Input() pageId: string;
  @Output() userPresenceStatus = new EventEmitter<boolean>();
  show: boolean = true;
  count = 1;
  inviteList = [];
  continueScroll: boolean = false;
  oldId: string = "";
  @ViewChild("PerfectScrollbarComponent")
  ComponentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;
  constructor(
    public _constantService: ConstantService,
    private _encrypt: EncryptionService,
    private postData: PostdataService
  ) {}

  ngOnInit() {
    this.oldId = this.pageId;
    this.getFriend4InvitePage(this.count);
  }

  ngDoCheck() {
    if (this.oldId != this.pageId) {
      this.oldId = this.pageId;
      this.count = 1;
      this.getFriend4InvitePage(this.count);
    }
  }

  getFriend4InvitePage(count) {
    var inviteFrnds = {};
    inviteFrnds["token"] = this._constantService.getSessionDataBYKey("token");
    inviteFrnds["token_param"] = {};
    inviteFrnds["token_param"]["device_type"] = "w";
    inviteFrnds["token_param"]["host"] = "";
    inviteFrnds["pg_uuid"] = this.pageId;
    inviteFrnds["count"] = count;

    this._constantService
      .fetchDataApi(
        this._constantService.getInviteFriends4PageServiceUrl(),
        inviteFrnds
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          if (count == 1) {
            this.inviteList = [];
          }
          this.count++;

          var inviteListArr = responseData.INVITATION_LIST;
          if (inviteListArr.length == 0) {
            this.userPresenceStatus.emit(false);
          }
          if (inviteListArr.length < 10) {
            this.continueScroll = false;
          } else {
            this.continueScroll = true;
          }
          for (var i = 0; i < inviteListArr.length; i++) {
            inviteListArr[i].FULL_NAME =
              inviteListArr[i].FIRST_NAME + " " + inviteListArr[i].LAST_NAME;
            if (inviteListArr[i].PROFILE_PHOTO_PATH != null) {
              inviteListArr[i].PROFILE_PHOTO_PATH =
                inviteListArr[i].PROFILE_PHOTO_PATH +
                "profile/" +
                inviteListArr[i].USER_ID +
                "_60x60.png";
            } else {
              inviteListArr[
                i
              ].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
            }
          }
          this.inviteList.push.apply(this.inviteList, inviteListArr);
        }
      });
  }

  sendInvite(id) {
    var sendInvite = {};
    sendInvite["token"] = this._constantService.getSessionDataBYKey("token");
    sendInvite["token_param"] = {};
    sendInvite["token_param"]["device_type"] = "w";
    sendInvite["token_param"]["host"] = "";
    sendInvite["pg_uuid"] = this.pageId;
    var ids=[];
    if (id == "all") {
      for (var i = 0; i < this.inviteList.length; i++) {
         ids.push(this.inviteList[i].USER_ID);
      }
    }else{
        ids[0]=id;
    }
    sendInvite["user_id"] = ids.join();

    this._constantService
      .fetchDataApi(
        this._constantService.getSendInviteFriends4PageServiceUrl(),
        sendInvite
      )
      .subscribe((data) => {
        var responseData: any = data;
        var status = responseData.STATUS;
        if (status == this._constantService.success_msg) {
          this._constantService.showToast(responseData.SUCCESS_MSG, "", 1);
          if(id=='all'){
              this.inviteList=[];
          }else{
            var index = this.inviteList.findIndex(
                (x) => x.USER_ID == parseInt(id)
              );
              this.inviteList.splice(index, 1);
          }
          
          if (this.inviteList.length == 0) {
            this.getFriend4InvitePage(this.count);
          }
        }
      });
    this.ComponentRef.directiveRef.update();
  }
}
