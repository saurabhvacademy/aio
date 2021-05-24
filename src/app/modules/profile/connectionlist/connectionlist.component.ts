import {Component, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {EncryptionService} from './../../../services/encryption.service';
import {ConstantService} from './../../../services/constant.service';
import {PostdataService} from './../../../services/postdata.service';

@Component({
    selector: 'app-connectionlist',
    templateUrl: './connectionlist.component.html',
    providers: [ConstantService, EncryptionService],
    // styleUrls: ['./connectionlist.component.scss']
    styleUrls: ['./../../../sharedComponents/peopleyouknow/peopleyouknow.component.scss', './../../../sharedComponents/peopleyouknow/responsivepeopleyouknow.component.scss', './../../../sharedComponents/connectionrequest/connectionrequest.component.scss', './newconnectionlist.component.scss']
})
export class ConnectionlistComponent implements OnInit, AfterViewInit {
    myprofile: boolean = false;
    finalConnections: string = "";
    connectionLength: number;
    connId = [];
    @Output() viewConnectionList = new EventEmitter<number>();
    @Output() changeTabProfile = new EventEmitter<number>();
    @Output() sessionLogout = new EventEmitter<boolean>();
    connectionIds: string = "";
    connectionWidgetView = 1;
    dataConf = {};
    openConfirmation: boolean = false;
    config: string;
    data: string;
    myconnection = [];
    current_user = "";
    herf = '';
    urlArr = [];
    t: string;
    loaderscreen: boolean = true;
    publicProfile: boolean = false;
    changeTab() {
        this.viewConnectionList.emit(1);
        this.changeTabProfile.emit(3);
    }

    constructor(
        public _constantService: ConstantService,
        public _router: Router,
        public _encryptionService: EncryptionService,
        private activatedRoute: ActivatedRoute,
        private _post: PostdataService
    ) {}

    ngOnInit() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if (this.t != null && this.t != 'undefined' && this.t != '') {
            this.activatedRoute.params.subscribe((params: Params) => {
                console.log('>>>>>>>>>>>>>>>>> lxy >>>>>>>>>>>>>>>');
                console.log(params);
                if (params['id'] != null) {
                    var userId = params['id'];
                    if (params['id'] != this.current_user) {
                        this.current_user = params['id'];
                        this.getUserConnectionFxn(params['id']);
                    }
                }
            }, error => {
                var responseData = error;
                if (responseData.status == 500) {
                    this._router.navigate(['500']);
                }
            });
        } else {
            this.publicProfile = true;
            this.activatedRoute.params.subscribe((params: Params) => {
                this.getPublcConnection(params['id']);
            });
        }


    }

    ngAfterViewInit() {



        //        if(this._constantService.getConnection()=="0"){
        //            this.connectionWidgetView = 2;
        //        } else {
        //            this.getConnectionDetails();
        //            this.connectionWidgetView = 1;
        //        }
    }

    ngDoCheck() {
        this.t = this._constantService.getSessionDataBYKey('token');
        //        if (this.t != null && this.t != 'undefined' && this.t != '') {
        //            this.activatedRoute.params.subscribe((params: Params) => {
        //                console.log(params);
        //                console.log(this.current_user);
        //                if (params['id'] != null) {
        //                    var userId = params['id'];
        //                    if (params['id'] != this.current_user) {
        //                        console.log('point A');
        //                        this.current_user = params['id'];
        //                        if (userId.slice(0, 1) == "#") {
        //                            this.getUserFollowerAndFollowing("", "yes");
        //                        } else {
        //                            this.getUserFollowerAndFollowing(params['id'], "no");
        //                        }
        //                    }
        //                }
        //            }, error => {
        //                var responseData = error;
        //                if (responseData.status == 500) {
        //                    this._router.navigate(['500']);
        //                }
        //            });
        //        }
    }

    getConnectionDetails() {
        var connDetails = {};
        connDetails['token'] = this._constantService.getSessionDataBYKey('token');
        connDetails['token_param'] = {};
        connDetails['token_param']['device_type'] = 'w';
        connDetails['token_param']['host'] = '';
        connDetails['fid'] = this.connectionIds;

        this._constantService.fetchDataApi(this._constantService.getConnectionDetailsServiceUrl(), connDetails).subscribe(data => {
            this.data = data["_body"];
            let responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);
                this.myconnection = responseData.FRIENDS_DETAIL;
                for (var i = 0; i < this.myconnection.length; i++) {
                    this.myconnection[i].LAST_ACTIVE_TIME = this._post.getPostDateTime(this.myconnection[i].LAST_ACTIVE_TIME);
                    this.myconnection[i].FULL_NAME = this.myconnection[i].FIRST_NAME + " " + this.myconnection[i].LAST_NAME;
                    if (this.myconnection[i].PROFILE_PHOTO_PATH != null) {
                        this.myconnection[i].PROFILE_PHOTO_PATH = this.myconnection[i].PROFILE_PHOTO_PATH + "profile/" + this.myconnection[i].USER_ID + "_60x60.png";
                    } else {
                        this.myconnection[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    }
                }
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

    updateSourcePic(event) {
        event.target.src = this._constantService.defaultImgPath;
    }


    getUserConnectionFxn(username) {
        var hitObj = {};
        hitObj['token'] = this._constantService.getSessionDataBYKey('token');
        hitObj['token_param'] = {};
        hitObj['token_param']['device_type'] = "w";
        hitObj['token_param']['host'] = "";
        hitObj['usr_name'] = username;

        this._constantService.fetchDataApi(this._constantService.getUserConnectionPublicServiceUrl(), hitObj).subscribe(data => {
            var responseData:any = data;
            if (responseData.STATUS == this._constantService.success_msg) {
                this.loaderscreen = false;
                if (responseData.CONNECTION.length == 0) {
                    this.connectionWidgetView = 2;
                } else {
                    this.connectionWidgetView = 1;
                    this.myconnection = responseData.CONNECTION;
                    for (var i = 0; i < this.myconnection.length; i++) {
                        if (this.myconnection[i].PROFILE_PHOTO_PATH != null) {
                            this.myconnection[i].PROFILE_PHOTO_PATH = this.myconnection[i].PROFILE_PHOTO_PATH + "profile/" + this.myconnection[i].USER_ID + "_60x60.png";
                        } else {
                            this.myconnection[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                        }
                        this.myconnection[i]['FULL_NAME'] = this.myconnection[i]['FIRST_NAME'] + ' ' + this.myconnection[i]['LAST_NAME'];
                    }
                }
            } else {
                this.loaderscreen = false;
                this.connectionWidgetView = 2;
            }
        }), error => {
            var err = error;
            if (err.status == 500) {
                this._router.navigate(['500']);
            }
        };
    }

    getUserFollowerAndFollowing(userName: string, profileView: string) {
        var userFollowAndFollowing = {};
        userFollowAndFollowing['token'] = this._constantService.getSessionDataBYKey('token');
        userFollowAndFollowing['token_param'] = {};
        userFollowAndFollowing['token_param']['device_type'] = 'w';
        userFollowAndFollowing['token_param']['host'] = '';
        userFollowAndFollowing['username'] = userName;
        if (userName == this._constantService.getSessionDataBYKey('username')) {
            userFollowAndFollowing['myprofile'] = true;
            this.myprofile = true;
        } else {
            userFollowAndFollowing['myprofile'] = false;
            this.myprofile = false;
        }

        this._constantService.fetchDataApi(this._constantService.getUserFollowAndFollowingServiceUrl(), userFollowAndFollowing).subscribe(data => {
            var responseData:any = data;
            var status = responseData.STATUS;
            if (status == this._constantService.success_msg) {

                this.loaderscreen = false;
                //this._constantService.setToken(responseData.TOKEN);
                this._constantService.setSessionJsonPair('token', responseData.TOKEN);

                this.connectionIds = responseData.CONNECTIONS;
                this.connId = this.connectionIds.split(',');
                if (this.connId.length > 10) {
                    this.connectionLength = 10;
                } else {
                    this.connectionLength = this.connId.length;
                }
                for (var i = 0; i < this.connectionLength; i++) {
                    if (i != 9) {
                        this.finalConnections = this.finalConnections + this.connId[i] + ",";
                    } else {
                        this.finalConnections = this.finalConnections + this.connId[i];
                    }
                }
                this.connectionIds = this.finalConnections;

                if (responseData.CONNECTIONS == "") {

                    this.connectionWidgetView = 2;
                } else {

                    this.getConnectionDetails();
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
    closePopup(event) {
        if (event['error'] == false) {
            this.openConfirmation = false;
        }
    }

    getPublcConnection(name) {
        var publicData = {};
        publicData['usr_name'] = name;

        this._constantService.fetchDataApi(this._constantService.getUserConnectionPublicServiceUrl(), publicData).subscribe(data => {
            var responseData:any = data;
            this.loaderscreen = false;
            if (responseData.STATUS == this._constantService.success_msg) {

                if (responseData.CONNECTION.length != 0) {
                    this.myconnection = responseData.CONNECTION;
                } else {
                    this.connectionWidgetView = 2;
                }
                for (var i = 0; i < this.myconnection.length; i++) {
                    if (this.myconnection[i].PROFILE_PHOTO_PATH != null) {
                        this.myconnection[i].PROFILE_PHOTO_PATH = this.myconnection[i].PROFILE_PHOTO_PATH + "profile/" + this.myconnection[i].USER_ID + "_60x60.png";
                    } else {
                        this.myconnection[i].PROFILE_PHOTO_PATH = this._constantService.defaultImgPath;
                    }
                    this.myconnection[i]['FULL_NAME'] = this.myconnection[i]['FIRST_NAME'] + ' ' + this.myconnection[i]['LAST_NAME'];
                }
            } else {
                this.connectionWidgetView = 2;
            }
        });

    }
}
