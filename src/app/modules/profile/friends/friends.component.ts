import {Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EncryptionService} from './../../../services/encryption.service';
import {PostdataService} from './../../../services/postdata.service';
import {ConstantService} from './../../../services/constant.service';

@Component({
    selector: 'app-friends',
    templateUrl: './friends.component.html',
    //host: {'(document:click)':'handleClick($event)'},
    providers: [ConstantService, EncryptionService],
    styleUrls: [ '../../profile-visitors/profile-visitors-page/profile-visitors-page.component.scss', './friends.component.scss']

})
export class FriendsComponent implements OnInit {
    oldId: string = '';
    username: any;
    lastfllwId: any;
    lastSuggId: any;
    connHitted: boolean = false;count: any;
    SuggScroll: boolean = false;
    suggCount = 0;
    loadFollowers: boolean = true;
    loadFollowing: boolean = true;
    loadConnections: boolean = true;
    loadConnReq: boolean = true;
    loadSuggestions: boolean = true;
    loadRequestSent: boolean = true;
    conn: boolean = true;
    f_id = [];
    profileId: any;
    conn_status = 0;
    dataConf = {};
    connect = true;
    cancelreq = false;
    openConfirmation: boolean = false;
    @Input() connectiontab: number;
    @Input() friendId: number;
    @Input() myProfile: number;
    @Input() showConn: boolean;
    @Input() tabsview: Object;
    @Output() sessionLogout = new EventEmitter<boolean>();
    @Output() cancelId = new EventEmitter();
    @Output() sendId = new EventEmitter();
    //@ViewChild('conn',{read:ElementRef}) conn:ElementRef;
    connectionView = 1;
    followersView = 1;
    followingView = 1;
    suggestionView = 1;
    sentView = 1;
    showif = 1;
    viewIndex = 2;
    data: string;
    t: string;
    showDropDown: any;
    openReamoveBox = false;
    public myconnection = [];
    public ifollow = [];
    public followers = [];
    public connRequest = [];
    public sentList = [];
    conn_ids = [];
    lconn_id = 0;
    lfollower_id = 0;
    lfollowing_id = 0;
    continueScroll: boolean = false;
    continueScrollReq: boolean = false;
    lconnRecId = 0;
    sentCount = 1;
    lstView = 1;
    oldTab = 0;
    my_profile: boolean = false;
    connectStatus: boolean = true;
    cnnectionList: boolean = false;
    userName: any;

    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        public _encryptionService: EncryptionService,
        private activatedRoute: ActivatedRoute,
        private _post: PostdataService
    ) {}

    ngDoCheck1() {
        this.userName=this._constantService.getSessionDataBYKey('username');
        if ((this.tabsview['userName'] == this._constantService.getSessionDataBYKey('username')) && this.tabsview['userName'] != undefined) {
            this.my_profile = true;
        } else {
            this.my_profile = false;
        }
        if ((this.connectiontab == 1 && this.lstView != 1) || (this.connectiontab == 1 && this.showConn == true)) {
            this.showConn = false;
            this.viewIndex = 1;
            this.ifollow = [];
            this.followers = [];
            this.myconnection = [];
            this.sentList = [];
            this.continueScroll = false;
            this.getConnectionIds(0, 1);
            this.lstView = 1;
        } else
            if (this.connectiontab == 2 && this.lstView != 2 && this.myProfile == 2) {
                this.viewIndex = 2;
                this.ifollow = [];
                this.followers = [];
                this.myconnection = [];
                this.sentList = [];
                this.continueScroll = false;
                this.getFollowerIds(0);
                this.lstView = 2;
            }
            else
                if (this.connectiontab == 3 && this.lstView != 3 && this.myProfile == 2) {
                    this.viewIndex = 3;
                    this.ifollow = [];
                    this.followers = [];
                    this.myconnection = [];
                    this.sentList = [];
                    this.continueScroll = false;
                    this.getFollowingIds(0);
                    this.lstView = 3;
                }
                else if (this.tabsview['connectionView'] == 1 && this.connHitted == false) {
                    this.connHitted = true;
                    this.myconnection = [];
                    this.getConnectionIds(0, 2);
                }
    }


    ngOnInit() {
        window.scrollTo(0, 0);
        this.userName=this._constantService.getSessionDataBYKey('username');
        if ((this.tabsview['usr_name'] == this._constantService.getSessionDataBYKey('username')) && this.tabsview['usr_name'] != undefined) {
            this.my_profile = true;
        } else {
            this.my_profile = false;
        }
        this.activatedRoute.params.subscribe((params: Params) => {
            this.username = params['id'];
            if (this.oldId == '') {
                this.getConnectionIds(0, 3);
                this.oldId = params['id'];
            } else if (this.oldId != params['id']) {
                window.location.reload();
                this.getConnectionIds(0, 3);
                this.oldId = params['id'];
            }
        })
        setTimeout(() => {
            this.getUserConnectionDetail();

        }, 200);
    }

    backToConnection() {
        this.showConn = true;
        this.connectiontab = 1;
        this._router.navigate(["/profile/" + this._constantService.getSessionDataBYKey('username') + "/#connection:connections"]);
    }

    getUserConnectionDetail() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this._constantService.getSessionDataBYKey('u_id') == 2) {
            var val = document.getElementById('Connections');
        } else {
            var val = document.getElementById('Connections');
            var id = val.classList.add('cursolnone');
            var id = val.classList.remove('cursor-pointer');
        }
        if (this.t != null && this.t != undefined && this.t != '') {
            if (this.tabsview['connectionView'] == 2) {
                if (this.connectiontab == 1) {

                    this.oldTab = 1;
                }
                this.get20ConnectionRequestList(0);
                this.getAllSuggestion(this.suggCount);
            }

            if (this._constantService.getFriendsId() == null) {
                this.connectionView = 2;
            }
        }



        this.activatedRoute.params.subscribe((params: Params) => {
            this.username = params['id'];
            if (params['id'] != undefined && params['id'] != null) {
                if (params['tabid'] == "#connection:connections") {
                    this.connectionpage(1);
                } else if (params['tabid'] == "#connection:followers") {
                    this.connectionpage(2);
                } else if (params['tabid'] == "#connection:following") {
                    this.connectionpage(3);
                } else if (params['tabid'] == "#connection:request") {
                    this.connectionpage(4);
                } else if (params['tabid'] == "#connection:suggestion") {
                    this.connectionpage(5);
                } else if (params['tabid'] == "#connection:requestSent") {
                    this.connectionpage(6);
                }
            }
        });
    }



    connectionpage(index) {
        if (index != this.oldTab) {
            this.lstView = this.oldTab;
            this.oldTab = index;
            this.ifollow = [];
            this.followers = [];
            this.myconnection = [];
            this.sentList = [];
            this.sentCount = 1;
            this.continueScroll = false;
            this.connectiontab = index;
            if (index == 1) {
                this._router.navigate(['profile/' + this.username + '/#connection:connections']);

            }
            else if (index == 2) {
                this._router.navigate(['profile/' + this.username + '/#connection:followers']);
            }
            else if (index == 3) {
                this._router.navigate(['profile/' + this.username + '/#connection:following']);
            }
            else if (index == 4) {
                this.connectiontab = 4;
                this._router.navigate(['profile/' + this.username + '/#connection:request']);
                // this.getUserConnectionDetail();

            }
            else if (index == 5) {
                this._router.navigate(['profile/' + this.username + '/#connection:suggestion']);
            }
            else if (index == 6) {
                this._router.navigate(['profile/' + this.username + '/#connection:requestSent']);
                this.getSentRequestIds(this.sentCount);
            }
            this.ngDoCheck1();
        }
    }

    setUserId(event) {
        //this._constantService.setFriendUserId(event.target.id);
        var frndUsrId = JSON.stringify(event.target.id);
        this._constantService.setSessionJsonPair('friend_user_id', frndUsrId);
    }

    public suggestion = [];

    onScrollDown() {
        if (this.connectiontab == 1) {
            if (this.continueScroll) {
                this.getConnectionIds(this.lconn_id, 5);
            }
        }
        if (this.connectiontab == 2) {
            if (this.continueScroll && this.myProfile == 2) {
                this.getFollowerIds(this.lfollower_id);
            }
        }
        if (this.connectiontab == 3 && this.myProfile == 2) {
            if (this.continueScroll) {
                this.getFollowingIds(this.lfollowing_id);
            }
        }
        if (this.connectiontab == 4) {
            if (this.continueScrollReq) {
                this.get20ConnectionRequestList(this.lconnRecId);
            }
        }
        if (this.connectiontab == 5) {

            if (this.SuggScroll) {
                this.getAllSuggestion(this.suggCount);
            }
        }

        if (this.connectiontab == 6) {
            if (this.continueScroll) {
                this.sentCount++;
                this.getSentRequestIds(this.sentCount);
            }
        }
    }

    getConnectionIds(lconn_id, val) {
        if (this.conn == true) {
            this.conn = false;
            var userConnections = {};
            userConnections['token'] = this._constantService.getSessionDataBYKey('token');
            userConnections['token_param'] = {};
            userConnections['token_param']['device_type'] = 'w';
            userConnections['token_param']['host'] = '';
            userConnections['lf_id'] = lconn_id;
            userConnections['count'] = '10';
            userConnections['flow'] = 'd';
            if ((this.username != this._constantService.getSessionDataBYKey('username')) && this.username != undefined) {
                userConnections['usr_name'] = this.username;
            } else {
                userConnections['usr_name'] = '';
            }

            this._constantService.fetchDataApi(this._constantService.getConnectionIdsServiceUrl(), userConnections).subscribe(data => {
                var responseData:any = data;
                var status = responseData.STATUS;
                if (status == this._constantService.success_msg) {
                    this.conn = true;

                    this.loadConnections = false;
                    var response = responseData.CONNECTIONS_IDS;
                    for (i = 0; i < response.length; i++) {
                        this.f_id = responseData.CONNECTIONS_IDS[i].USER_ID;
                        this._constantService.setFriendsId(responseData.CONNECTIONS_IDS[i].USER_ID);
                    }

                    if (response.length != 0) {
                        this.lconn_id = response[response.length - 1].USER_CONNECTION_ID;
                    }
                    if (response.length < 10) {
                        this.continueScroll = false;
                    } else {
                        this.continueScroll = true;
                    }
                    if (responseData.CONNECTIONS_IDS.length == 0 && lconn_id == 0) {
                        this.connectionView = 2;
                    }
                    var connIds = '';
                    for (var i = 0; i < response.length; i++) {
                        if (i == 0) {
                            connIds = response[i].USER_ID;
                        } else {
                            connIds += ',' + response[i].USER_ID;
                        }

                    }

                    if(connIds){
                         this.getConnectionDetails(connIds);
                    }

                }

            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });
        }
    }

    getFollowerIds(lfollower_id) {
        var userConnections = {};
        userConnections['token'] = this._constantService.getSessionDataBYKey('token');
        userConnections['token_param'] = {};
        userConnections['token_param']['device_type'] = 'w';
        userConnections['token_param']['host'] = '';
        userConnections['lf_id'] = lfollower_id;
        userConnections['count'] = '10';
        userConnections['flow'] = 'd';

        this._constantService.fetchDataApi(this._constantService.getFollowerIdsServiceUrl(), userConnections).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.loadFollowers = false;
                var response = responseData.FOLLOWERS_IDS;
                if (response.length != 0) {
                    this.lfollower_id = response[response.length - 1].USER_FOLLOW_ID;
                }
                if (response.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                if (response.length == 0 && lfollower_id == 0) {
                    this.followersView = 2;
                } else {
                    this.followersView = 1;
                }
                var followerIds = '';
                for (var i = 0; i < response.length; i++) {
                    if (i == 0) {
                        followerIds = response[i].USER_ID;
                    } else {
                        followerIds += ',' + response[i].USER_ID;
                    }
                }
                this.getFollowersDetails(followerIds);

            }

        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getFollowingIds(lfollowing_id) {

        var userConnections = {};
        userConnections['token'] = this._constantService.getSessionDataBYKey('token');
        userConnections['token_param'] = {};
        userConnections['token_param']['device_type'] = 'w';
        userConnections['token_param']['host'] = '';
        userConnections['lf_id'] = lfollowing_id;
        userConnections['count'] = '20';
        userConnections['flow'] = 'd';


        this._constantService.fetchDataApi(this._constantService.getFollowingIdsServiceUrl(), userConnections).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                this.lastfllwId = lfollowing_id;
                this.loadFollowing = false;
                var response = responseData.FOLLOWING_IDS;
                if (response.length != 0) {
                    this.lfollowing_id = response[response.length - 1].USER_FOLLOW_ID;

                }
                setTimeout(() => {
                    if (response.length < 20) {
                        this.continueScroll = false;
                    } else {
                        this.continueScroll = true;
                    }
                }, 500);
                if (response.length == 0 && lfollowing_id == 0) {
                    this.followingView = 2;
                } else {
                    this.followingView = 1;
                }
                var followingIds = "";
                for (var i = 0; i < response.length; i++) {
                    if (i == 0) {
                        followingIds += response[i].USER_ID;
                    } else {
                        followingIds += "," + response[i].USER_ID;
                    }
                }
                this.getFollowingsDetails(followingIds);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });

    }


    getConnectionDetails(ids: string) {
        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['fid'] = ids;

        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData:any=data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var myconn = responseData.FRIENDS_DETAIL;
                for (var i = 0; i < myconn.length; i++) {
                    myconn[i].FULL_NAME = myconn[i].FIRST_NAME + " " + myconn[i].LAST_NAME;
                    myconn[i].LAST_ACTIVE_TIME = this._post.getPostDateTime(myconn[i].LAST_ACTIVE_TIME);
                    if (myconn[i].PROFILE_PHOTO_PATH == null) {
                        myconn[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    } else {
                        myconn[i].PROFILE_PHOTO_PATH = myconn[i].PROFILE_PHOTO_PATH + "profile/" + myconn[i].USER_ID + "_60x60.png";
                    }
                    if (myconn[i].FRIEND_STATUS == null) {
                        myconn[i].FRIEND_STATUS = 4;
                    }
                }

                this.myconnection.push.apply(this.myconnection, myconn);
                this.loadConnections = false;
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    removeFriend(event, i) {
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        var unfriendData = {};
        unfriendData['token'] = this._constantService.getSessionDataBYKey('token');
        unfriendData['token_param'] = {};
        unfriendData['token_param']['device_type'] = 'w';
        unfriendData['token_param']['host'] = '';
        unfriendData['conrecid'] = idAttr.nodeValue;
        var id = "conn_" + idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.getConnectionUnFriend(), unfriendData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                var f_id = this._constantService.getFriendsId().split(",");
                var i = f_id.indexOf(idAttr.nodeValue);
                f_id.splice(i, 1);
                this._constantService.setFriendsId(f_id.toString());

                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.myconnection.splice(i, 1);
                (<HTMLElement> document.getElementById(id)).style.display = "none";
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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

    getFollowingsDetails(ids: string) {
        var followingDetails = {};
        followingDetails['token'] = this._constantService.getSessionDataBYKey('token');
        followingDetails['token_param'] = {};
        followingDetails['token_param']['device_type'] = 'w';
        followingDetails['token_param']['host'] = '';
        followingDetails['fid'] = ids;


        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), followingDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData:any=data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var following = responseData.FRIENDS_DETAIL;
                for (var i = 0; i < following.length; i++) {
                    following[i].LAST_ACTIVE_TIME = this._post.getPostDateTime(following[i].LAST_ACTIVE_TIME);
                    following[i].FULL_NAME = following[i].FIRST_NAME + " " + following[i].LAST_NAME;
                    if (following[i].PROFILE_PHOTO_PATH == null) {
                        following[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath
                    } else {
                        following[i].PROFILE_PHOTO_PATH = following[i].PROFILE_PHOTO_PATH + "profile/" + following[i].USER_ID + "_60x60.png";
                    }
                    following[i].IS_FOLLOWED = 1;
                }
                this.ifollow.push.apply(this.ifollow, following);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getFollowersDetails(ids: string) {
        var followersDetails = {};
        followersDetails['token'] = this._constantService.getSessionDataBYKey('token');
        followersDetails['token_param'] = {};
        followersDetails['token_param']['device_type'] = 'w';
        followersDetails['token_param']['host'] = '';
        followersDetails['fid'] = ids;

        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), followersDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData:any=data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var ifollowers = responseData.FRIENDS_DETAIL;
                for (var i = 0; i < ifollowers.length; i++) {
                    ifollowers[i].LAST_ACTIVE_TIME = this._post.getPostDateTime(ifollowers[i].LAST_ACTIVE_TIME);
                    ifollowers[i].FULL_NAME = ifollowers[i].FIRST_NAME + " " + ifollowers[i].LAST_NAME;
                    if (ifollowers[i].PROFILE_PHOTO_PATH == null) {
                        ifollowers[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath
                    } else {
                        ifollowers[i].PROFILE_PHOTO_PATH = ifollowers[i].PROFILE_PHOTO_PATH + "profile/" + ifollowers[i].USER_ID + "_60x60.png";
                    }
                }
                this.followers.push.apply(this.followers, ifollowers);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    requestUnfollow(event, i) {
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        var requestUnfollow = {};
        requestUnfollow['token'] = this._constantService.getSessionDataBYKey('token');
        requestUnfollow['token_param'] = {};
        requestUnfollow['token_param']['device_type'] = 'w';
        requestUnfollow['token_param']['host'] = '';
        requestUnfollow['conrecid'] = idAttr.nodeValue;
        var id = "fwg_" + idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.getRequestUnfollowServiceUrl(), requestUnfollow).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.cancelId.emit(idAttr.nodeValue);
                this.ifollow[i].IS_FOLLOWED = 0;
                //(<HTMLElement> document.getElementById(id)).style.display = "none";
                //this.ifollow.splice(i, 1);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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


    requestFollow(event, i) {
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        var requestFollow = {};
        requestFollow['token'] = this._constantService.getSessionDataBYKey('token');
        requestFollow['token_param'] = {};
        requestFollow['token_param']['device_type'] = 'w';
        requestFollow['token_param']['host'] = '';
        requestFollow['conrecid'] = idAttr.nodeValue;
        var id = "fwg_" + idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.getRequestFollowServiceUrl(), requestFollow).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.sendId.emit(idAttr.nodeValue);
                this.ifollow[i].IS_FOLLOWED = 1;

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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



    get20ConnectionRequestList(ids) {
        var connReqList = {};
        connReqList['token'] = this._constantService.getSessionDataBYKey('token');
        connReqList['token_param'] = {};
        connReqList['token_param']['device_type'] = 'w';
        connReqList['token_param']['host'] = '';
        connReqList['flow'] = 'd';
        connReqList['lconid'] = ids;

        this._constantService.fetchDataApi(this._constantService.get20ConnReqServiceUrl(), connReqList).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.loadConnReq = false;
                if (responseData.CONIDS.length != 0) {
                    this.lconnRecId = responseData.CONIDS[responseData.CONIDS.length - 1].USER_CONNECTION_ID;
                    this.showif = 1;
                    var arr = [];
                    for (var i = 0; i < responseData.CONIDS.length; i++) {
                        arr.push(responseData.CONIDS[i].USER_ID);
                    }
                    this.get20ConnReqDetails(arr.join());
                } else if (ids == 0) {
                    this.showif = 2;
                }
                if (responseData.CONIDS.length < 10) {
                    this.continueScrollReq = false;
                } else {
                    this.continueScrollReq = true;
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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

    get20ConnReqDetails(ids: string) {
        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['fid'] = ids;

        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var connReq = responseData.FRIENDS_DETAIL;
                for (var i = 0; i < connReq.length; i++) {
                    connReq[i].LAST_ACTIVE_TIME = this._post.getPostDateTime(connReq[i].LAST_ACTIVE_TIME);
                    connReq[i].FULL_NAME = connReq[i].FIRST_NAME + " " + connReq[i].LAST_NAME;
                    if (connReq[i].PROFILE_PHOTO_PATH == null) {
                        connReq[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath
                    } else {
                        connReq[i].PROFILE_PHOTO_PATH = connReq[i].PROFILE_PHOTO_PATH + "profile/" + connReq[i].USER_ID + "_60x60.png";
                    }
                    connReq[i]['STATUS'] = 0;
                }
                this.connRequest.push.apply(this.connRequest, connReq);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    updateConnreqAccpt(event, i) {
        var updConnRecAccpt = {};
        updConnRecAccpt['token'] = this._constantService.getSessionDataBYKey('token');
        updConnRecAccpt['token_param'] = {};
        updConnRecAccpt['token_param']['device_type'] = 'w';
        updConnRecAccpt['token_param']['host'] = '';
        if (this.my_profile == false) {
            updConnRecAccpt['conrecid'] = event;
        } else {
            var target = event.currentTarget;
            var idAttr = target.attributes.id;
            updConnRecAccpt['conrecid'] = idAttr.nodeValue;
            var id = "connReq_" + idAttr.nodeValue;
        }

        this._constantService.fetchDataApi(this._constantService.updateConnRecAcceptServiceUrl(), updConnRecAccpt).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.my_profile == false) {
                    //this.sendId.emit(this.myconnection[i].USER_ID);
                    this.myconnection[i]['FRIEND_STATUS'] = 1;
                } else {
                    if (this._constantService.getFriendsId() != '' && this._constantService.getFriendsId() != null) {
                        var f_id = this._constantService.getFriendsId().split(",");
                        f_id.push(idAttr.nodeValue);
                        this._constantService.setFriendsId(f_id.toString());
                    } else {
                        this._constantService.setFriendsId(idAttr.nodeValue.toString());
                    }
                    //(<HTMLElement> document.getElementById(id)).style.display = "none";
                    this.myconnection.push(this.connRequest[i]);
                    this.connRequest[i]['STATUS'] = 1;
                    //this.connRequest.splice(i, 1);
                }
                if (this.connRequest.length == 0) {
                    this.showif = 2;
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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


    updateConnreqReject(event, i) {
        var updConnRecAccpt = {};
        var target = event.currentTarget;
        var idAttr = target.attributes.id;
        updConnRecAccpt['token'] = this._constantService.getSessionDataBYKey('token');
        updConnRecAccpt['token_param'] = {};
        updConnRecAccpt['token_param']['device_type'] = 'w';
        updConnRecAccpt['token_param']['host'] = '';
        updConnRecAccpt['conrecid'] = idAttr.nodeValue;
        var id = "connReq_" + idAttr.nodeValue;

        this._constantService.fetchDataApi(this._constantService.updateConnRecRejectServiceUrl(), updConnRecAccpt).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                (<HTMLElement> document.getElementById(id)).style.display = "none";
                this.connRequest.splice(i, 1);
                if (this.connRequest.length == 0) {
                    this.showif = 2;
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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

    getUserFollowerAndFollowing(userName: string, profileView: string) {
        var userFollowAndFollowing = {};
        userFollowAndFollowing['token'] = this._constantService.getSessionDataBYKey('token');
        userFollowAndFollowing['token_param'] = {};
        userFollowAndFollowing['token_param']['device_type'] = 'w';
        userFollowAndFollowing['token_param']['host'] = '';
        userFollowAndFollowing['username'] = userName;
        userFollowAndFollowing['myprofile'] = profileView;

        this._constantService.fetchDataApi(this._constantService.getUserFollowAndFollowingServiceUrl(), userFollowAndFollowing).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.tabsview['connectionView'] == 2) {
                    if (responseData.FOLLOWINGS != '') {
                        this.getFollowingsDetails(responseData.FOLLOWINGS);
                    } else {
                        this.followingView = 2;
                    }
                    if (responseData.FOLLOWERS != '') {
                        this.getFollowersDetails(responseData.FOLLOWERS);
                    } else {
                        this.followersView = 2;
                    }

                }
                if (responseData.CONNECTIONS != '') {
                    this.getConnectionDetails(responseData.CONNECTIONS);
                } else {
                    this.connectionView = 2;
                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);

            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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

    getAllSuggestion(lstsugg) {
        var suggestionData = {};
        suggestionData['token'] = this._constantService.getSessionDataBYKey('token');
        suggestionData['token_param'] = {};
        suggestionData['token_param']['device_type'] = 'w';
        suggestionData['token_param']['host'] = '';
        suggestionData['lssugg'] = lstsugg;
        suggestionData['count'] = 10;
        suggestionData['flow'] = 'd';

        this._constantService.fetchDataApi(this._constantService.getUserSuggestionServiceUrl(), suggestionData).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.loadSuggestions = false;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var suggestion_id = responseData.SUGG_ID;
                if (suggestion_id.length != 0) {
                    this.suggCount = suggestion_id[suggestion_id.length - 1];
                    this.suggestionView = 2;
                    this.getAllSuggestionDetails(suggestion_id.join());
                }
                if (suggestion_id.length == 10) {
                    this.SuggScroll = true;
                }
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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

    getAllSuggestionDetails(ids) {
        var suggDetails = {};
        suggDetails['token'] = this._constantService.getSessionDataBYKey('token');
        suggDetails['token_param'] = {};
        suggDetails['token_param']['device_type'] = 'w';
        suggDetails['token_param']['host'] = '';
        suggDetails['fid'] = ids;

        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), suggDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var suggestion = responseData.FRIENDS_DETAIL;
                for (var i = 0; i < suggestion.length; i++) {
                    suggestion[i].LAST_ACTIVE_TIME = this._post.getPostDateTime(suggestion[i].LAST_ACTIVE_TIME);
                    suggestion[i].FULL_NAME = suggestion[i].FIRST_NAME + " " + suggestion[i].LAST_NAME;
                    this.profileId = suggestion[i].USER_ID;
                    if (suggestion[i].PROFILE_PHOTO_PATH == null) {
                        suggestion[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath
                    } else {
                        suggestion[i].PROFILE_PHOTO_PATH = suggestion[i].PROFILE_PHOTO_PATH + "profile/" + suggestion[i].USER_ID + "_60x60.png";
                    }
                    suggestion[i]['connectStatus'] = false;
                }
                this.suggestion.push.apply(this.suggestion, suggestion);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getSentRequestIds(count) {
        var userConnections = {};
        userConnections['token'] = this._constantService.getSessionDataBYKey('token');
        userConnections['token_param'] = {};
        userConnections['token_param']['device_type'] = 'w';
        userConnections['token_param']['host'] = '';
        userConnections['count'] = count;

        this._constantService.fetchDataApi(this._constantService.getSentIdsServiceUrl(), userConnections).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                this.loadRequestSent = false;
                var response = responseData.SEND_REQUEST_IDS;
                if (response.length < 10) {
                    this.continueScroll = false;
                } else {
                    this.continueScroll = true;
                }
                if (response.length == 0 && count == 1) {
                    this.sentView = 2;
                } else {
                    this.sentView = 1;
                }
                var sentIds = "";
                for (var i = 0; i < response.length; i++) {
                    if (i == 0) {
                        sentIds += response[i];
                    } else {
                        sentIds += "," + response[i];
                    }
                }
                this.getSentReqDetails(sentIds);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }

    getSentReqDetails(ids) {
        var suggDetails = {};
        suggDetails['token'] = this._constantService.getSessionDataBYKey('token');
        suggDetails['token_param'] = {};
        suggDetails['token_param']['device_type'] = 'w';
        suggDetails['token_param']['host'] = '';
        suggDetails['fid'] = ids;

        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), suggDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                var sentListt = responseData.FRIENDS_DETAIL.reverse();
                for (var i = 0; i < sentListt.length; i++) {
                    sentListt[i].LAST_ACTIVE_TIME = this._post.getPostDateTime(sentListt[i].LAST_ACTIVE_TIME);
                    this.profileId = sentListt[i].USER_ID;
                    if (sentListt[i].PROFILE_PHOTO_PATH == null) {
                        sentListt[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath
                    } else {
                        sentListt[i].PROFILE_PHOTO_PATH = sentListt[i].PROFILE_PHOTO_PATH + "profile/" + sentListt[i].USER_ID + "_60x60.png";
                    }
                    sentListt[i].FULL_NAME = sentListt[i].FIRST_NAME + " " + sentListt[i].LAST_NAME;
                    sentListt[i]['connectStatus'] = true;
                }
                this.sentList.push.apply(this.sentList, sentListt);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
            }
        }, error => {
            var responseData = error;
            if (responseData.status == 500) {
                this._router.navigate(['500']);
            }
        });
    }


    sendRequest(id, i) {
        var sendSuggestionRequest = {};
        sendSuggestionRequest['token'] = this._constantService.getSessionDataBYKey('token');
        sendSuggestionRequest['token_param'] = {};
        sendSuggestionRequest['token_param']['device_type'] = 'w';
        sendSuggestionRequest['token_param']['host'] = '';
        sendSuggestionRequest['conrecid'] = id;
        var id = id;
        this._constantService.fetchDataApi(this._constantService.getSendConnectionRequestServiceUrl(), sendSuggestionRequest).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {
                if (this.my_profile == false) {
                    this.myconnection[i]['FRIEND_STATUS'] = 0;
                    this.sendId.emit(this.myconnection[i].USER_ID);
                } else {
                    if (this.connectiontab == 5) {
                        this.suggestion[i]['removeCancelButton'] = true;
                        this.suggestion[i]['connectStatus'] = true;
                        this.sendId.emit(this.suggestion[i].USER_ID);

                    }
                    if (this.connectiontab == 6) {
                        this.sentList[i]['connectStatus'] = true;
                        this.sendId.emit(this.sentList[i].USER_ID);
                    }
                    if (this.connectiontab == 3) {
                        this.ifollow[i]['removeConnectButton'] = true;
                    }
                    // this.sendId.emit(this.suggestion[i].USER_ID);
                }
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
            } else if (status == this._constantService.error_token) {
                this.sessionLogout.emit(true);
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

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
    toggleDropdown(id) {
        this.openReamoveBox = !this.openReamoveBox;
        this.showDropDown = id;
    }
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    delSuggestion(id, i) {
        var delSuggestion = {};
        delSuggestion['token'] = this._constantService.getSessionDataBYKey('token');
        delSuggestion['token_param'] = {};
        delSuggestion['token_param']['device_type'] = "w";
        delSuggestion['token_param']['host'] = '';
        delSuggestion['suggid'] = id;

        this._constantService.fetchDataApi(this._constantService.getDelSuggestionServiceUrl(), delSuggestion).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == 'success') {
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.suggestion.splice(i, 1);
                if (this.suggestion.length == 0) {
                    this.suggestionView = 1;
                }
            }
        });
    }

    cancelFrndReq(event, i) {
        var cancelReq = {};
        cancelReq['token'] = this._constantService.getSessionDataBYKey('token');
        cancelReq['token_param'] = {};
        cancelReq['token_param']['device_type'] = 'w';
        cancelReq['token_param']['host'] = '';
        cancelReq['conrecid'] = event.target.id;
        var id = "sugg_" + event.target.id;

        this._constantService.fetchDataApi(this._constantService.getCancelFrndReqServiceUrl(), cancelReq).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                if (this.my_profile == false) {
                    this.cancelId.emit(this.myconnection[i].USER_ID);
                    this.myconnection[i]['FRIEND_STATUS'] = 4;
                } else {
                    if (this.connectiontab == 5) {
                        this.suggestion[i]['connectStatus'] = false;
                        this.cancelId.emit(this.suggestion[i].USER_ID);
                    }
                    if (this.connectiontab == 6) {
                        this.sentList[i]['connectStatus'] = false;
                        this.cancelId.emit(this.sentList[i].USER_ID);
                    }
                    //                    if (this.suggestion[i] != undefined) {
                    //                        this.suggestion[i]['connectStatus'] = false;
                    //                    }
                    //                    if (this.sentList[i] != undefined) {console.log("Here");
                    //                        this.sentList[i]['connectStatus'] = false;
                    //                    }
                    //this.cancelId.emit(this.sentList[i].USER_ID);
                }
            }
        })
        this.connectStatus = false;
    }


    //    handleClick(event) {
    //        var clickedComponent = event.target;
    //        var headerInside = 0;
    //        do {
    //            if(this.tabsview['connectionView']==2){
    //                if (clickedComponent === this.conn.nativeElement) {
    //                    headerInside = 1;
    //                }
    //            }
    //            clickedComponent = clickedComponent.parentNode;
    //        } while (clickedComponent);
    //        if (headerInside != 1) {
    //            //this.showDropDown=0;
    //        }
    //
    //    }

    showList() {
        this.cnnectionList = !this.cnnectionList;
    }

    sendToInbox(connections) {
        this._constantService.setSessionJsonPair('user_name', connections.FULL_NAME);
        this._constantService.setSessionJsonPair('friend_user_id', connections.USER_ID);
        this._router.navigate(['/inbox/' + connections.USER_NAME]);
        this._constantService.setSessionJsonPair('fom_res', 1);
    }

    updateProfilePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }
}
