import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EncryptionService } from './encryption.service'
import { Subject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
// declare var gapi: any;
@Injectable()
export class ConstantService {
  //platformDefinition is a variable to choose the services to be used in panel.
  //'development'  :  for local dist and development
  //'staging'  :  for UAT
  //'production'  :  for Live
  platformDefinition: string = "development";
  version: string = "";
  googleClientId: string;
  facebookAppId: string;

  askAssistantPath = "/inbox/support.study5065";
  verified: boolean;
  access_token: string = "";
  service_url: string;
  master_service_url: string;
  user_service_url: string;
  notification_service_url: string;
  connection_service_url: string;
  post_service_url: string;
  purchase_service_url: string;
  comment_service_url: string;
  search_service_url: string;
  ldrBoard_service_url: string;
  message_service_url: string;
  suggestion_service_url: string;
  trending_service_url: string;
  setting_service_url: string;
  saved_service_url: string;
  file_service_url: string;
  page_service_url: string;
  course_service_url: string;
  public pageDetails: any;
  date = new Date();
  error_token = "error_token";
  success_msg = "success";
  payuPaymentServerURL;
  paytmPaymentServerURL;
  videoServerURL;
  page_Profile_path;
  user_Profile_path;
  // gapiinstance;
  url_pattern = new RegExp(
    "((http|https)(://))?(www.)?(([a-zA-Z0-9]+[.]{1}){2}|youtu(b|.b)|vime(o.)|(http|https)(://))[a-zA-z0-9]+(/{2}[a-zA-Z0-9-]+)*/?.+",
    "i"
  );
  //    url_pattern = new RegExp("((http|https)(:\/\/))?(www\.)?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");
  //    url_pattern = new RegExp("^((http|https|ftp)(:\/\/))?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$", "i");
  defaultImgPath =
    "../assets/images/defaultImgPathForSuggestedConnections.svg";
  defaultImgPathForSuggestedConnections =
    "../assets/images/defaultImgPathForSuggestedConnections.png";
  defaultPageIndImgPath = "./assets/images/individual_profile.svg";
  defaultPageCollgImgPath = "./assets/images/organization_profile.svg";
  defaultCoverImgPath = "./assets/images/coverimage.jpg";
  commentPlaceHolder = "Write a comment...";
  replyPlaceHolder = "Write a reply...";
  junkText =
    '<br><div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;"><div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;"><div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div></div>';
  libraryBucketPath;
  staticPostShareLink: string = "";
  ckeditorPath: string = "";
  awsKey = {};
  websocketURL = "";
  antMediaStreamUrl = "rtmp://testmedia.hellouser.co.in/WebRTCAppEE/";
  antmediaURL = "testmedia.hellouser.co.in";
  screenShareExtentionId = "acbjloehclednkmokadabncnbfekpepl";
  videoCDNUrl = "https://strm.akamaized.net/WebRTCAppEE/streams/";
  auth2: any;
  baseAssetPath = "https://uatimg1.aio.com/assets";
  staticArticleShareLink: string;
  article_service_url: string;
  googleAnalyticsUAId: string = '';
  starRatingObject = {
    '0.0': ['star-gray.svg', 'star-gray.svg', 'star-gray.svg', 'star-gray.svg', 'star-gray.svg'],
    '0.5': ['star-half-filled.svg', 'star-gray.svg', 'star-gray.svg', 'star-gray.svg', 'star-gray.svg'],
    '1.0': ['star-filled.svg', 'star-gray.svg', 'star-gray.svg', 'star-gray.svg', 'star-gray.svg'],
    '1.5': ['star-filled.svg', 'star-half-filled.svg', 'star-gray.svg', 'star-gray.svg', 'star-gray.svg'],
    '2.0': ['star-filled.svg', 'star-filled.svg', 'star-gray.svg', 'star-gray.svg', 'star-gray.svg'],
    '2.5': ['star-filled.svg', 'star-filled.svg', 'star-half-filled.svg', 'star-gray.svg', 'star-gray.svg'],
    '3.0': ['star-filled.svg', 'star-filled.svg', 'star-filled.svg', 'star-gray.svg', 'star-gray.svg'],
    '3.5': ['star-filled.svg', 'star-filled.svg', 'star-filled.svg', 'star-half-filled.svg', 'star-gray.svg'],
    '4.0': ['star-filled.svg', 'star-filled.svg', 'star-filled.svg', 'star-filled.svg', 'star-gray.svg'],
    '4.5': ['star-filled.svg', 'star-filled.svg', 'star-filled.svg', 'star-filled.svg', 'star-half-filled.svg'],
    '5.0': ['star-filled.svg', 'star-filled.svg', 'star-filled.svg', 'star-filled.svg', 'star-filled.svg'],
  }
  utility_service_url: string;

  constructor(
    private http: HttpClient,
    private _encryptionService: EncryptionService,
    private _cookie: CookieService,
    private toastr: ToastrService
  ) {
    //        if (this.platformDefinition == 'development') {
    //            this.user_service_url = 'https://192.168.0.237:8445/4.0.0.1';
    //            this.notification_service_url = 'https://192.168.0.237:8446/4.0.0.1';
    //            this.connection_service_url = 'https://192.168.0.237:8447/4.0.0.1';
    //            this.post_service_url = 'https://192.168.0.237:8448/4.0.0.1';
    //            this.comment_service_url = 'https://192.168.0.237:8449/4.0.0.1';
    //            this.message_service_url = 'https://192.168.0.237:8450/4.0.0.1';
    //            this.search_service_url = 'https://192.168.0.237:8451/4.0.0.1';
    //            this.suggestion_service_url = 'https://192.168.0.237:8452/4.0.0.1';
    //            this.trending_service_url = 'https://192.168.0.237:8453/4.0.0.1';
    //            this.setting_service_url = 'https://192.168.0.237:8454/4.0.0.1';
    //            this.saved_service_url = 'https://192.168.0.237:8455/4.0.0.1';
    //            this.file_service_url = 'https://192.168.0.237:8460/4.0.0.1';
    //            this.page_service_url = 'https://192.168.0.237:8462/4.0.0.1';
    //            this.course_service_url = 'https://192.168.0.237:8463/4.0.0.1';
    //            this.purchase_service_url = 'https://192.168.0.237:8464/4.0.0.1';
    //            this.videoServerURL = 'https://192.168.0.228/study24x7_video/video_final.php';
    //            this.paymentServerURL = 'https://192.168.0.228/study24x7_payment/payumoney/payu.php';
    //            this.libraryBucketPath = "https://s3.ap-south-1.amazonaws.com/247-cors-test/assets/lib_cp_";
    //            this.staticPostShareLink = 'https://192.168.0.174:4200/post/';
    //
    //        }
    // this.gapiinstance = gapi;
    if (this.platformDefinition == "development") {
      this.master_service_url = "http://192.168.0.237:8101/4.0.0.1";
      this.user_service_url = "http://192.168.0.237:8102/4.0.0.1";
      this.notification_service_url = "http://192.168.0.237:8103/4.0.0.1";
      this.connection_service_url = "http://192.168.0.237:8104/4.0.0.1";
      this.post_service_url = "http://192.168.0.237:8105/4.0.0.1";
      this.article_service_url = "http://192.168.0.237:8126/4.0.0.1";
      this.utility_service_url = "http://192.168.0.237:8127/4.0.0.1";
      this.comment_service_url = "http://192.168.0.237:8106/4.0.0.1";
      this.message_service_url = "http://192.168.0.237:8107/4.0.0.1";
      this.search_service_url = "http://192.168.0.237:8108/4.0.0.1";
      this.ldrBoard_service_url = "http://192.168.0.237:8128/4.0.0.1";
      this.suggestion_service_url = "http://192.168.0.237:8109/4.0.0.1";
      this.trending_service_url = "http://192.168.0.237:8110/4.0.0.1";
      this.setting_service_url = "http://192.168.0.237:8111/4.0.0.1";
      this.saved_service_url = "http://192.168.0.237:8112/4.0.0.1";
      this.file_service_url = "http://192.168.0.237:8117/4.0.0.1";
      this.page_service_url = "http://192.168.0.237:8119/4.0.0.1";
      this.course_service_url = "http://192.168.0.237:8120/4.0.0.1";
      this.purchase_service_url = "http://192.168.0.237:8121/4.0.0.1";
      this.videoServerURL = "http://192.168.0.228/study24x7_video/bitmovin.php";
      this.payuPaymentServerURL =
        "http://192.168.0.228/study24x7_payment/payumoney/payu.php";
      this.paytmPaymentServerURL =
        "http://192.168.0.228/study24x7_payment/paytm/paytm.php";
      // this.paytmPaymentServerURL = 'http://localhost/paytmstudy/payments/paytm/paytm.php';
      this.libraryBucketPath =
        "https://s3.ap-south-1.amazonaws.com/247-cors-test/assets/course_Lib_Img/Course-images-";
      this.staticPostShareLink = window.location.origin+'/post/';
      this.staticArticleShareLink = "http://study.dist/article/";
      this.googleClientId =
        "820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com";
      this.facebookAppId = "2192549784145974";
      this.ckeditorPath = "http://study.dist/ckeditor/";
      this.askAssistantPath = "/inbox/ask.assistant5753";
      //             this.websocketURL= "http://192.168.0.174:3010";
      this.websocketURL = "http://192.168.0.235:3010";
      // this.websocketURL = "localhost:3010";
      this.antMediaStreamUrl = "rtmp://testmedia.hellouser.co.in/WebRTCAppEE/";
      this.antmediaURL = "testmedia.hellouser.co.in";
      this.screenShareExtentionId = "acbjloehclednkmokadabncnbfekpepl";
      this.videoCDNUrl =
        "https://testmedia.hellouser.co.in:5443/WebRTCAppEE/streams/";
      this.awsKey = {
        accessKeyId: "AKIAJSJ2PZ6EJS2IHYUQ", // For write
        secretAccessKey: "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",
        signature: "v4",
        region: "ap-south-1",
      };
    } else if (this.platformDefinition == "staging") {
      this.master_service_url = "https://mastersuat.aio.net:8443/4.0.0.1";
      this.user_service_url = "https://usersuat.aio.net:8443/4.0.0.1";
      this.notification_service_url =
        "https://notificationsuat.aio.net:8443/4.0.0.1";
      this.connection_service_url =
        "https://connectionsuat.aio.net:8443/4.0.0.1";
      this.post_service_url = "https://postsuat.aio.net:8443/4.0.0.1";
      this.message_service_url =
        "https://messagesuat.aio.net:8443/4.0.0.1";
      this.search_service_url = "https://searchuat.aio.net:8443/4.0.0.1";
      this.ldrBoard_service_url =
        "https://rewarduat.aio.net:8443/4.0.0.1";

      this.suggestion_service_url =
        "https://suggestionsuat.aio.net:8443/4.0.0.1";
      this.trending_service_url =
        "http://trendingsuat.aio.net:8443/4.0.0.1";
      this.setting_service_url =
        "https://settingsuat.aio.net:8443/4.0.0.1";
      this.saved_service_url = "https://saveduat.aio.net:8443/4.0.0.1";
      this.file_service_url = "https://fileuat.aio.net:8443/4.0.0.1";
      this.page_service_url = "https://pageuat.aio.net:8443/4.0.0.1";
      this.purchase_service_url =
        "https://purchaseuat.aio.net:8443/4.0.0.1";
      this.course_service_url = "https://courseuat.aio.net:8443/4.0.0.1";
      this.videoServerURL = "https://videouat.aio.net/bitmovin.php";
      this.payuPaymentServerURL =
        "https://paymentuat.aio.net/payumoney/payu.php";
      this.paytmPaymentServerURL =
        "https://paymentuat.aio.net/paytm/paytm.php";
      this.libraryBucketPath =
        "https://s3.ap-south-1.amazonaws.com/247-cors-test/assets/course_Lib_Img/Course-images-"; this.staticPostShareLink = "https://study.hellouser.co.in/post/";
      this.googleClientId =
        "820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com";
      this.facebookAppId = "2192549784145974";
      this.ckeditorPath = "https://study.hellouser.co.in/ckeditor/";
      this.askAssistantPath = "/inbox/support.study5065";
      this.article_service_url =
        "https://articleuat.aio.net:8443/4.0.0.1";
      this.utility_service_url = "https://utilityuat.aio.net:8443/4.0.0.1";
      this.websocketURL = "https://videouat.aio.net:3011";
      this.antMediaStreamUrl = "rtmp://testmedia.hellouser.co.in/WebRTCAppEE/";
      this.antmediaURL = "testmedia.hellouser.co.in";
      this.screenShareExtentionId = "acbjloehclednkmokadabncnbfekpepl";
      this.staticArticleShareLink = "https://study.hellouser.co.in/article/";
      this.videoCDNUrl =
        "https://testmedia.hellouser.co.in:5443/WebRTCAppEE/streams/";
      this.awsKey = {
        accessKeyId: "AKIAJSJ2PZ6EJS2IHYUQ", // For write
        secretAccessKey: "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",
        signature: "v4",
        region: "ap-south-1",

      };
      this.googleAnalyticsUAId = "UA-166286712-1";
    } else if (this.platformDefinition == "internal_testing") {
      this.master_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.user_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.notification_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.connection_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.post_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.comment_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.message_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.search_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.suggestion_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.trending_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.setting_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.saved_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.file_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.page_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.course_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.purchase_service_url =
        "http://192.168.0.227:8080/internal_testing-4.0.0.2";
      this.videoServerURL = "http://192.168.0.227/study24x7_video/bitmovin.php";
      this.payuPaymentServerURL =
        "http://192.168.0.227/study24x7_payment/payumoney/payu.php";
      this.paytmPaymentServerURL =
        "http://192.168.0.227/study24x7_payment/paytm/paytm.php";
      this.libraryBucketPath =
        "https://s3.ap-south-1.amazonaws.com/247-cors-test/assets/course_Lib_Img/Course-images-"; this.staticPostShareLink = "http://study.internaltesting/post/";
      this.googleClientId =
        "820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com";
      this.facebookAppId = "2192549784145974";
      this.ckeditorPath = "http://study.internaltesting/ckeditor/";
      this.askAssistantPath = "/inbox/ask.assistant2253";
      this.websocketURL = "http://192.168.0.235:3010";
      this.antMediaStreamUrl = "rtmp://testmedia.hellouser.co.in/WebRTCAppEE/";
      this.antmediaURL = "testmedia.hellouser.co.in";
      this.screenShareExtentionId = "acbjloehclednkmokadabncnbfekpepl";
      this.videoCDNUrl =
        "https://testmedia.hellouser.co.in:5443/WebRTCAppEE/streams/";
      this.awsKey = {
        accessKeyId: "AKIA33J25GCDSDKCVGOG", // For write
        secretAccessKey: "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",
        signature: "v4",
        region: "ap-south-1",
      };
    } else if (this.platformDefinition == "testing") {
      this.master_service_url = "http://192.168.0.237:8101/4.0.0.1_testing";
      this.user_service_url = "http://192.168.0.237:8102/4.0.0.1_testing";
      this.notification_service_url =
        "http://192.168.0.237:8103/4.0.0.1_testing";
      this.connection_service_url = "http://192.168.0.237:8104/4.0.0.1_testing";
      this.post_service_url = "http://192.168.0.237:8105/4.0.0.1_testing";
      this.comment_service_url = "http://192.168.0.237:8106/4.0.0.1_testing";
      this.message_service_url = "http://192.168.0.237:8107/4.0.0.1_testing";
      this.search_service_url = "http://192.168.0.237:8108/4.0.0.1_testing";
      this.suggestion_service_url = "http://192.168.0.237:8109/4.0.0.1_testing";
      this.trending_service_url = "http://192.168.0.237:8110/4.0.0.1_testing";
      this.setting_service_url = "http://192.168.0.237:8111/4.0.0.1_testing";
      this.saved_service_url = "http://192.168.0.237:8112/4.0.0.1_testing";
      this.file_service_url = "http://192.168.0.237:8117/4.0.0.1_testing";
      this.page_service_url = "http://192.168.0.237:8119/4.0.0.1_testing";
      this.course_service_url = "http://192.168.0.237:8120/4.0.0.1_testing";
      this.article_service_url = "http://192.168.0.237:8126/4.0.0.1_testing";
      this.purchase_service_url = "http://192.168.0.237:8121/4.0.0.1_testing";
      this.videoServerURL =
        "http://192.168.0.228/study24x7_video_testing/bitmovin.php";
      this.payuPaymentServerURL =
        "http://192.168.0.228/study24x7_payment_testing/payumoney/payu.php";
      this.paytmPaymentServerURL =
        "http://192.168.0.228/study24x7_payment_testing/paytm/paytm.php";
      this.libraryBucketPath =
        "https://s3.ap-south-1.amazonaws.com/247-cors-test/assets/course_Lib_Img/Course-images-"; this.staticPostShareLink = "http://study.disttesting/post/";
      this.googleClientId =
        "820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com";
      this.facebookAppId = "2192549784145974";
      this.ckeditorPath = "http://study.disttesting/ckeditor/";
      this.askAssistantPath = "/inbox/support.study5065";
      this.websocketURL = "http://192.168.0.235:3010";
      this.antMediaStreamUrl = "rtmp://testmedia.hellouser.co.in/WebRTCAppEE/";
      this.antmediaURL = "testmedia.hellouser.co.in";
      this.screenShareExtentionId = "acbjloehclednkmokadabncnbfekpepl";
      this.videoCDNUrl =
        "https://testmedia.hellouser.co.in:5443/WebRTCAppEE/streams/";
      this.awsKey = {
        accessKeyId: "AKIAJQ2VXJ3WYTWFKCXQ", // For write
        secretAccessKey: "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",
        signature: "v4",
        region: "ap-south-1",
      };
    } else if (this.platformDefinition == "test_uat") {
      this.master_service_url = "https://mastersuat.aio.net/4.0.0.1";
      this.user_service_url = "https://usersuat.aio.net/4.0.0.1";
      this.notification_service_url =
        "https://notificationsuat.aio.net/4.0.0.1";
      this.connection_service_url =
        "https://connectionsuat.aio.net/4.0.0.1";
      this.post_service_url = "https://postsuat.aio.net/4.0.0.1";
      this.message_service_url = "https://messagesuat.aio.net/4.0.0.1";
      this.search_service_url = "https://searchuat.aio.net/4.0.0.1";
      this.ldrBoard_service_url = "https://rewarduat.aio.net/4.0.0.1";

      this.suggestion_service_url =
        "https://suggestionsuat.aio.net/4.0.0.1";
      this.trending_service_url = "http://trendingsuat.aio.net/4.0.0.1";
      this.setting_service_url = "https://settingsuat.aio.net/4.0.0.1";
      this.saved_service_url = "https://saveduat.aio.net/4.0.0.1";
      this.file_service_url = "https://fileuat.aio.net/4.0.0.1";
      this.page_service_url = "https://pageuat.aio.net/4.0.0.1";
      this.purchase_service_url = "https://purchaseuat.aio.net/4.0.0.1";
      this.course_service_url = "https://courseuat.aio.net/4.0.0.1";
      this.videoServerURL = "https://videouat.aio.net/bitmovin.php";
      this.payuPaymentServerURL =
        "https://paymentuat.aio.net/payumoney/payu.php";
      this.paytmPaymentServerURL =
        "https://paymentuat.aio.net/PAYTM/paytm.php";
      this.libraryBucketPath =
        "https://s3.ap-south-1.amazonaws.com/247-cors-test/assets/course_Lib_Img/Course-images-"; this.staticPostShareLink = "https://study.hellouser.co.in/post/";
      this.googleClientId =
        "820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com";
      this.facebookAppId = "2192549784145974";
      this.ckeditorPath = "https://study.hellouser.co.in/ckeditor/";
      this.askAssistantPath = "/inbox/ask.assistant5753";
      this.websocketURL = "https://videouat.aio.net:3011";
      this.antMediaStreamUrl = "rtmp://testmedia.hellouser.co.in/WebRTCAppEE/";
      this.antmediaURL = "testmedia.hellouser.co.in";
      this.screenShareExtentionId = "acbjloehclednkmokadabncnbfekpepl";
      this.videoCDNUrl = "https://studymediaaka.azureedge.net/";
      this.awsKey = {
        accessKeyId: "AKIAJSJ2PZ6EJS2IHYUQ", // For write
        secretAccessKey: "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",
        signature: "v4",
        region: "ap-south-1",
      };
    } else if (this.platformDefinition == "production") {
      this.master_service_url = "https://masters.aio.net/4.0.0.1";
      this.user_service_url = "https://users.aio.net/4.0.0.1";
      this.notification_service_url =
        "https://notifications.aio.net/4.0.0.1";
      this.connection_service_url = "https://connections.aio.net/4.0.0.1";
      this.post_service_url = "https://posts.aio.net/4.0.0.1";
      this.message_service_url = "https://messages.aio.net/4.0.0.1";
      this.search_service_url = "https://search.aio.net/4.0.0.1";
      this.ldrBoard_service_url = "https://reward.aio.net/4.0.0.1";
      this.suggestion_service_url = "https://suggestions.aio.net/4.0.0.1";
      this.trending_service_url = "http://trendings.aio.net/4.0.0.1";
      this.setting_service_url = "https://settings.aio.net/4.0.0.1";
      this.saved_service_url = "https://saved.aio.net/4.0.0.1";
      this.file_service_url = "https://file.aio.net/4.0.0.1";
      this.page_service_url = "https://page.aio.net/4.0.0.1";
      this.purchase_service_url = "https://purchase.aio.net/4.0.0.1";
      this.course_service_url = "https://course.aio.net/4.0.0.1";
      this.videoServerURL = "https://video.aio.net/bitmovin.php";
      this.payuPaymentServerURL =
        "https://payment.aio.net/payumoney/payu.php";
      this.paytmPaymentServerURL =
        "https://payment.aio.net/paytm/paytm.php";
      this.libraryBucketPath =
        "https://s3.ap-south-1.amazonaws.com/247-cors/assets/course_Lib_Img/Course-images-";
      this.article_service_url = "https://article.aio.net/4.0.0.1";
      this.utility_service_url = "https://utility.aio.net/4.0.0.1";
      this.staticPostShareLink = "https://www.aio.com/post/";
      this.staticArticleShareLink = "https://www.aio.com/article/";
      this.googleClientId =
        "820432769646-rvnalptiheclr2n3um6fevdcduill802.apps.googleusercontent.com";
      this.facebookAppId = "309713967120907";
      this.ckeditorPath = "https://www.aio.com/ckeditor/";
      this.askAssistantPath = "/inbox/ask.assistant6617";
      this.websocketURL = "https://orbit.hellouser.co.in:3011";
      this.antMediaStreamUrl = "rtmp://media.aio.net/WebRTCAppEE/";
      this.antmediaURL = "media.aio.net";
      this.screenShareExtentionId = "acbjloehclednkmokadabncnbfekpepl";
      this.videoCDNUrl = "https://studymediaaka.azureedge.net/";
      this.awsKey = {
        accessKeyId: "AKIA33J25GCDSDKCVGOG", // For write
        secretAccessKey: "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",
        signature: "v4",
        region: "ap-south-1",
      };
      this.googleAnalyticsUAId = "UA-121776610-1";
    } else if (this.platformDefinition == "master_merge") {
      this.master_service_url =
        "http://192.168.0.228:8101/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.user_service_url =
        "http://192.168.0.228:8102/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.notification_service_url =
        "http://192.168.0.228:8103/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.connection_service_url =
        "http://192.168.0.228:8104/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.post_service_url =
        "http://192.168.0.228:8105/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.comment_service_url =
        "http://192.168.0.228:8106/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.message_service_url =
        "http://192.168.0.228:8107/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.search_service_url =
        "http://192.168.0.228:8108/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.suggestion_service_url =
        "http://192.168.0.228:8109/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.trending_service_url =
        "http://192.168.0.228:8110/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.setting_service_url =
        "http://192.168.0.228:8111/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.saved_service_url =
        "http://192.168.0.228:8112/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.file_service_url =
        "http://192.168.0.228:8117/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.page_service_url =
        "http://192.168.0.228:8119/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.course_service_url =
        "http://192.168.0.228:8120/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.purchase_service_url =
        "http://192.168.0.228:8121/study247-2.0.0.7_master_merge-BUILD-SNAPSHOT";
      this.videoServerURL =
        "http://192.168.0.228/study24x7_video_master_merge/bitmovin.php";
      this.payuPaymentServerURL =
        "http://192.168.0.228/study24x7_payment_master_merge/payumoney/payu.php";
      this.askAssistantPath = "/inbox/support.study5065";
    }
  }

  ngOnInit() { }

  getLoginServiceUrl() {
    return this.user_service_url + "/login/lChk";
  }

  getRegisterServiceUrl() {
    return this.user_service_url + "/reg/getReg";
  }

  getRegistrationForTeacherUrl() {
    return this.user_service_url + "/reg/getRegTchr";
  }

  checkRegisterServiceUrl() {
    return this.user_service_url + "/reg/chkReg";
  }

  checkSocialLogin() {
    return this.user_service_url + "/reg/chkLgRg4SclV1";
  }

  sendOTPForSocial() {
    return this.user_service_url + "/reg/putSndOTP4SclV1";
  }

  verifyOTPForSocial() {
    return this.user_service_url + "/reg/getVrfyOTP4SclV1";
  }

  newVerifyOTPForMSocial() {
    return this.user_service_url + "/reg/OtpVerfyMobScl";
  }

  newVerifyOTPForESocial() {
    return this.user_service_url + "/reg/getVrfyOTP4SclV1";
  }

  getEmailVerificationServiceUrl() {
    return this.user_service_url + "/reg/verfUsr";
  }

  getMobileVerificationServiceUrl() {
    return this.user_service_url + "/reg/verfUsr";
  }

  getForgotPasswordSendServiceUrl() {
    return this.user_service_url + "/forgotPass/sndSec4FP";
  }

  getverifyPass() {
    return this.user_service_url + "/user/pwVerify";
  }

  getForgotPasswordVerifyServiceUrl() {
    return this.user_service_url + "/forgotPass/verifySec4FP";
  }

  getForgotPasswordSetPassServiceUrl() {
    return this.user_service_url + "/forgotPass/setPass";
  }

  getLoginOTPSendServiceUrl() {
    return this.user_service_url + "/login/sndSec4L";
  }

  getLoginOTPVerifyServiceUrl() {
    return this.user_service_url + "/login/chkSec4L";
  }
  getScholarshipRegistrationUrl() {
    return this.user_service_url + "/schlrshp/putApply4Schlarshp";
  }
  getUpcomingScholarshipTestDetailsUrl() {
    return this.user_service_url + "/schlrshp/getUpcmngSchlrshpDt";
  }
  getUpcomingScholarshipTestDetatilsPblcUrl() {
    return this.user_service_url + "/schlrshp/getUpcmngSchlrshpDtPblc";
  }
  getScholarshipTestLinkUrl() {
    return this.user_service_url + "/schlrshp/strtSchlrshpTst";
  }
  getScholarshipTestDetailsUrl() {
    return this.user_service_url + "/schlrshp/getTstDtls";
  }
  getDownloadScholarshipTestResultUrl() {
    return this.user_service_url + "/schlrshp/dwnldTstRprt";
  }
  getUpdateUserCareerTestTypeUrl() {
    return this.user_service_url + "/career/updtUsrCrrrTyp";
  }
  getRegisterForCareerUrl() {
    return this.user_service_url + "/career/rgstrFrCrrrV1";
  }
  getErnollStatusApiUrl() {
    return this.user_service_url + "/career/chckCrrEnrll";
  }
  getAddUpdateQualificationUrl() {
    return this.user_service_url + "/career/addUpdtUsrQlfctnV1";
  }
  getUpdateGeneralInfoUrl() {
    return this.user_service_url + "/career/updtGnrlInfo";
  }

  getInterestv1ServiceUrl() {
    return this.master_service_url + "/getInterestV1";
  }

  getCountryv1ServiceUrl() {
    return this.master_service_url + "/getCountryV1";
  }


  getAllLanguageServiceUrl() {
    return this.master_service_url + "/getLanguage";
  }

  getAddInterstServiceUrl() {
    return this.user_service_url + "/reg/saveInterest";
  }

  getLogoutServiceUrl() {
    return this.user_service_url + "/session/logout";
  }

  getUserNetworkInfoServiceUrl() {
    return this.post_service_url + "/wall/getUrsNetCount";
  }

  getUserQuesCountServiceUrl() {
    return this.post_service_url + "/wall/getWallCntQustn";
  }

  getAllPostDataServiceUrl() {
    return this.post_service_url + "/wall/getAllPost";
  }

  getArticlePostDataServiceUrl() {
    return this.post_service_url + "/wall/getFltrArtlPst";
  }

  getTodayClassesServiceUrl() {
    return this.post_service_url + "/wall/getTdyLvStrmFrUsr";
  }

  getQuestionForYouServiceUrl() {
    return this.post_service_url + "/wall/getFltrQstnPostsV1";
  }

  getPageDirectoryServiceUrl() {
    return this.post_service_url + "/wall/dir4UsrPgPstCors";
  }
  getUserAnalyticsByIntrstServiceUrl() {
    return this.post_service_url + "/wall/getWallAnltcsCntndIntrst";
  }

  updateUserInterest4AnalyticsServiceUrl() {
    return this.post_service_url + "/wall/updWallAnlytcPstIntrst";
  }

  getUserWallAnalyticsServiceUrl() {
    return this.post_service_url + "/wall/getWallAnltcsFrTknUsr";
  }
  getUpcomingClassesServiceUrl() {
    return this.post_service_url + "/wall/getLvStrmFrUsr";
  }

  getMentorInvitesServiceUrl() {
    return this.post_service_url + "/wall/getMntrsStrmV1";
  }

  getUserDetailsServiceUrl() {
    return this.user_service_url + "/profile/getUsrDetails";
  }

  getUserStatusServiceUrl() {
    return this.user_service_url + "/profile/getUserStatus";
  }

  getUserSummaryUpdateServiceUrl() {
    return this.user_service_url + "/profile/putUsrSummary";
  }
  getAboutUsData() {
    return this.user_service_url + "/profile/getAboutUs";
  }

  getUpdateProfileViewedByUrl() {
    return this.user_service_url + "/profile/putUsrPrflVw";
  }
  getVisitorsListApiUrl() {
    return this.user_service_url + "/profile/getUsrsVwdPrfl";
  }

  getPrivacyData() {
    return this.setting_service_url + "/setting/getPricPolcy";
  }
  getOtpForUnsubscribe() {
    return this.setting_service_url + "/setting/sndOtpFrMlUnsbcrb";
  }
  verifyOtpForUnsubscribe() {
    return this.setting_service_url + "/setting/vrfyOtpFrMlUnsbcrb";
  }

  getPoliciesData() {
    return this.setting_service_url + "/setting/getTerms";
  }

  getSimilarCourses() {
    return this.suggestion_service_url + "/suggest/getPgCorsSugg";
  }

  getUserEduUpadateServiceUrl() {
    return this.user_service_url + "/profile/putUsrQual";
  }

  getUserExpUpadateServiceUrl() {
    return this.user_service_url + "/profile/putUsrExp";
  }
  Articles;
  getResendVerificationServiceUrl() {
    return this.user_service_url + "/reg/reSendVarifCode";
  }

  getConnectionDetailsServiceUrl() {
    return this.connection_service_url + "/connReq/getFrndDetails";
  }

  getConnectionIdsServiceUrl() {
    return this.connection_service_url + "/connReq/getAllConnUsrs";
  }

  getFollowerIdsServiceUrl() {
    return this.connection_service_url + "/connReq/getAllfollower";
  }

  getFollowingIdsServiceUrl() {
    return this.connection_service_url + "/connReq/getAllfollowing";
  }

  getSentIdsServiceUrl() {
    return this.connection_service_url + "/connReq/getAllSendRequest";
  }

  getSendConnectionRequestServiceUrl() {
    return this.connection_service_url + "/connReq/sendRequest";
  }

  getRequestFollowServiceUrl() {
    return this.connection_service_url + "/connReq/putFollowing";
  }

  getConnectionUnFriend() {
    return this.connection_service_url + "/connReq/putUnFriend";
  }
  getCancelReq() {
    return this.connection_service_url + "/connReq/updConnReqCncl";
  }

  getRequestUnfollowServiceUrl() {
    return this.connection_service_url + "/connReq/delFollowing";
  }

  getPositionServiceUrl() {
    return this.master_service_url + "/getPosition";
  }

  getOrganizationServiceUrl() {
    return this.master_service_url + "/getOrganization";
  }

  getCourseServiceUrl() {
    return this.master_service_url + "/getCourse";
  }

  getInstitutionServiceUrl() {
    return this.master_service_url + "/getInstitute";
  }

  getCountryServiceUrlNew() {
    return this.master_service_url + "/getCountryNew";
    //return 'http://192.168.0.173:8081/study247/getCountryNew';
  }

  getYoutubeVedeoDataUrl() {
    // return "http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc";
    return "http://www.youtube.com/oembed?url=VIDEO_URL&format=json"
  }

  getBannerUrl() {
    return this.master_service_url + "/getBnnrsWidData";
  }

  getUserEduDetailsServiceUrl() {
    return this.user_service_url + "/profile/getUsrQual";
  }

  getUserExpDetailsServiceUrl() {
    return this.user_service_url + "/profile/getUsrExp";
  }

  getDelUsrExpServiceUrl() {
    return this.user_service_url + "/profile/deleteUserExp";
  }

  getDelUsrEduServiceUrl() {
    return this.user_service_url + "/profile/deleteUserQual";
  }

  getUserFollowAndFollowingServiceUrl() {
    return this.connection_service_url + "/connReq/getFollowerFollowingIds";
  }

  get10ConnReqServiceUrl() {
    return this.connection_service_url + "/connReq/get10ConnReq";
  }

  get20ConnReqServiceUrl() {
    return this.connection_service_url + "/connReq/get20ConnReq";
  }

  getAddGenPostServiceUrl() {
    return this.post_service_url + "/wall/putGenPost";
  }

  updateUserGenInfoServiceUrl() {
    return this.setting_service_url + "/setting/putUsrGenInfo";
  }

  updateConnRecAcceptServiceUrl() {
    return this.connection_service_url + "/connReq/updConnReqAccpt";
  }

  updateConnRecRejectServiceUrl() {
    return this.connection_service_url + "/connReq/updConnReqCncl";
  }

  getLinkDataServiceUrl() {
    return this.post_service_url + "/wall/getLinkData";
  }

  getLatestPostIdServiceUrl() {
    return this.post_service_url + "/wall/getLatestPost";
  }

  getLatestPostIdWithDateServiceUrl() {
    return this.post_service_url + "/wall/getLatestPostWthDat";
  }

  getLatestPostDataServiceUrl() {
    return this.post_service_url + "/wall/getPostWeb";
  }

  getAddPostWithAttachemntServiceUrl() {
    return this.post_service_url + "/wall/putFileAttchPostV2";
  }

  getTrendPostPublicServiceUrl() {
    return this.post_service_url + "/wall/get15TrendPstsV1";
  }

  getUploadFileServiceUrl() {
    return this.file_service_url + "/upload/uldFileAttchPostV1";
  }

  getImportedLibraryServiceUrl() {
    return this.file_service_url + "/download/libImp";
  }

  getDownloadResourcesUrl() {
    return this.file_service_url + "/download/dwnlRsrcs"
  }

  getDownloadResourcesUrlSolution() {
    return this.file_service_url + "/download/dwnlRsrcsV1"
  }
  getpdfviewerServiceUrl() {
    return this.file_service_url + "/download/getDoc";
  }

  getUserInterestServiceUrl() {
    return this.post_service_url + "/wall/getUsrInterest";
  }

  getLtUserInterestServiceUrl() {
    return this.post_service_url + "/wall/getLtPostIntOfUsrPg";
  }

  getLatestPgids10PublicPost() {
    return this.post_service_url + "/pgwall/getPbLtPgPost";
  }

  getPagePostsRestUrl() {
    return this.post_service_url + "/pgwall/getLtstPgPstV1";
  }

  getreviewPublicPost() {
    return this.page_service_url + "/pageReview/getPbPgRat";
  }

  getPgFollowList() {
    return this.page_service_url + "/page/getPgFollowList";
  }

  getpgAbout() {
    return this.page_service_url + "/page/getPbAbt";
  }

  getUsrPageListServiceUrl() {
    return this.page_service_url + "/page/getUsrPgLst";
  }
  getdeletePage() {
    return this.page_service_url + "/page/delPageUser";
  }
  getpgDetailPublic() {
    return this.page_service_url + "/page/getPubPgDetail";
  }
  getpgGalleryPublic() {
    return this.page_service_url + "/page/getPubPgGalry";
  }

  getUpdatePostInterestServiceUrl() {
    return this.post_service_url + "/wall/updatePostInterest";
  }

  getUserPostDataServiceUrl() {
    return this.user_service_url + "/profile/getLatestPostUsr";
  }

  getProfilePostDataServiceUrl() {
    return this.user_service_url + "/profile/getLtstPstUsrV1";
  }

  getUserLastActiveServiceUrl() {
    return this.user_service_url + "/profile/getUsrLtActTm";
  }

  getStateServiceUrl() {
    return this.master_service_url + "/getState";
  }

  getCityServiceUrl() {
    return this.master_service_url + "/getCity";
  }

  getSendVeri4PassChangeServiceUrl() {
    return this.setting_service_url + "/setting/sndSec4SP";
  }

  getSavedVerifyOTPServiceUrl() {
    return this.setting_service_url + "/setting/sendVCOD4EmailMobileVerfy";
  }

  getSavedVerifyServiceUrl() {
    return this.setting_service_url + "/setting/emailMobileVerf";
  }

  getVerifyCode4PassChangeServiceUrl() {
    return this.setting_service_url + "/setting/verifySec4SP";
  }

  getPassChangeServiceUrl() {
    return this.setting_service_url + "/setting/setPass4SP";
  }

  getSendVeri4EmailMobileChangeServiceUrl() {
    return this.setting_service_url + "/setting/sendVCOD4EmailMobileChange";
  }

  getVerifyCode4EmailMobileChangeServiceUrl() {
    return this.setting_service_url + "/setting/emailMobileChangeVerify";
  }
  getsubscribeMail() {
    return this.setting_service_url + "/setting/Scrb";
  }

  getUnsubscribeMail() {
    return this.setting_service_url + "/setting/unScrb";
  }
  getUsrUnscrCode() {
    return this.setting_service_url + "/setting/getUsrUnscrCode";
  }

  get10UserSuggestionServiceUrl() {
    return this.suggestion_service_url + "/suggest/get10Suggest";
  }

  getUserSuggestionServiceUrl() {
    return this.suggestion_service_url + "/suggest/getAllSuggest";
  }

  getSendSuggestionRequestServiceUrl() {
    return this.suggestion_service_url + "/suggest/sndSuggestRequest";
  }

  getCourseSuggestionPublicServiceUrl() {
    return this.suggestion_service_url + "/suggest/getPblcPgCrsSggstns";
  }

  getDelSuggestionServiceUrl() {
    return this.suggestion_service_url + "/suggest/delSuggest";
  }

  get10TrendingServiceUrl() {
    return this.trending_service_url + "/trend/get10Trend";
  }

  getTrendingServiceUrl() {
    return this.trending_service_url + "/trend/getTrend";
  }

  putCommentServiceUrl() {
    return this.post_service_url + "/wall/putCommentV1";
  }

  puReplyOnCommentServiceUrl() {
    return this.post_service_url + "/wall/putRplyOnComment";
  }

  putUserPostImportantServiceUrl() {
    return this.post_service_url + "/wall/updPostImp";
  }
  putUserUnsubscribe() {
    return this.user_service_url + "/profile/unScrb";
  }

  get10MessageTrailServiceUrl() {
    return this.message_service_url + "/message/getL10mess";
  }

  get10MessageTrailOnPageServiceUrl() {
    return this.message_service_url + "/message/getL10messForPage";
  }

  get10BroadcastTrailServiceUrl() {
    return this.message_service_url + "/message/getBroadcastMsg";
  }

  getAllMessageServiceUrl() {
    return this.message_service_url + "/message/getAllMsg";
  }

  delCommentServiceUrl() {
    return this.post_service_url + "/wall/delCommentV1";
  }

  delReplyServiceUrl() {
    return this.post_service_url + "/wall/delRplyOnComment";
  }

  getUserSavedFolderServiceUrl() {
    return this.saved_service_url + "/saved/getAllDirSavedPost";
  }

  putUserSavedFolderServiceUrl() {
    return this.saved_service_url + "/saved/putSavedFolder";
  }

  putPostToSavedFolder() {
    return this.saved_service_url + "/saved/addPost2Folder";
  }

  getAllRecievedMsgServiceUrl() {
    return this.message_service_url + "/message/getAllRecvMsg";
  }

  putMessageSeenStatusServiceUrl() {
    return this.message_service_url + "/message/updStatusMsgSeen";
  }

  putMessageSeenStatusPageServiceUrl() {
    return this.message_service_url + "/message/updStatusMsgSeenPage";
  }

  putMsgServiceUrl() {
    return this.message_service_url + "/message/sndMsg";
  }

  putMsgPageServiceUrl() {
    return this.message_service_url + "/message/sndPageMsg";
  }

  putBroadcastServiceUrl() {
    return this.message_service_url + "/message/pageBroadcastMsg";
  }

  putDownloadCountServiceUrl() {
    return this.post_service_url + "/wall/updDwnlCount";
  }

  putCommentImportServiceUrl() {
    return this.post_service_url + "/wall/updCommentImpt";
  }

  putReplyImportServiceUrl() {
    return this.post_service_url + "/wall/updRplyImpt";
  }

  getCommentOnPostServiceUrl() {
    return this.post_service_url + "/wall/shwComment";
  }
  getpostReachUrl() {
    return this.post_service_url + "/wall/postReach";
  }

  getPostFromSavedFolderServiceUrl() {
    return this.saved_service_url + "/saved/getAllPostFrmFolder";
  }

  putUserPostUnsaved() {
    return this.saved_service_url + "/saved/updPostUnsaved";
  }

  getSharePostServiceUrl() {
    return this.post_service_url + "/wall/putShrPost";
  }
  getpageReport() {
    return this.post_service_url + "/wall/PicPageRep";
  }

  getSearchWall10ServiceUrl() {
    return this.search_service_url + "/search/wall10V1";
  }

  getPagesDetailsBySearchUrl() {
    return this.search_service_url + "/search/getPgSrchDt"
  }

  getSearchedConnectionUser() {
    return this.search_service_url + "/search/getConUsr";
  }

  getSearchPostDataServiceUrl() {
    return this.post_service_url + "/wall/getPostData4Srch";
  }

  putQuestionPostServiceUrl() {
    return this.post_service_url + "/wall/putQuesPostV3";
  }

  getQuestionPostDataWallServiceUrl() {
    return this.post_service_url + "/wall/getQustPostWall";
  }
  getQuestionPostDataProfileServiceUrl() {
    return this.post_service_url + "/wall/getQustPostProf";
  }

  putQuestionResponseServiceUrl() {
    return this.post_service_url + "/wall/putQustResp";
  }

  getLatestPublicPostServiceUrl() {
    return this.post_service_url + "/wall/getLtPIds4PublicPost";
  }

  getLatestPublicPostWithDateServiceUrl() {
    return this.post_service_url + "/wall/getLtPIds4PublicPostWthDat";
  }

  getReportPostServiceUrl() {
    return this.post_service_url + "/wall/putReportV1";
  }
  getDeletePostServiceUrl() {
    return this.post_service_url + "/wall/delPost";
  }

  get10NotificationServiceUrl() {
    return this.notification_service_url + "/notify/get10UsrNotify";
  }

  getDeleteConversationServiceUrl() {
    return this.message_service_url + "/message/delMsgTrail";
  }

  getDeleteSavedFolderServiceUrl() {
    return this.saved_service_url + "/saved/delSavedFolder";
  }

  getRecentSavedPostIdServiceUrl() {
    return this.saved_service_url + "/saved/getRcntPostFrmFolder";
  }

  getReplyOnCommentServiceUrl() {
    return this.post_service_url + "/wall/shwRplyOnComment";
  }

  getAboutUsServiceUrl() {
    return this.user_service_url + "/profile/getAboutUs";
  }
  getContactUs() {
    return this.user_service_url + "/profile/getContectUs";
  }

  getUserNotification() {
    return this.notification_service_url + "/notify/getAllUsrNotify";
  }
  getPageNotification() {
    return this.notification_service_url + "/pageNotify/getNotification";
  }

  getSearchServiceUrl() {
    return this.search_service_url + "/search/wall";
  }

  getSearchUserServiceUrl() {
    return this.search_service_url + "/search/message";
  }

  getNotificationUpdateSeenServiceUrl() {
    return this.notification_service_url + "/notify/statusSeen";
  }

  getQuestionForYouServiceUr() {
    return this.post_service_url + "/wall/getFltrQstnPost";
  }

  getAllNotificationUpdateSeenServiceUrl() {
    return this.notification_service_url + "/notify/allStatusSeen";
  }

  getUserListOnImpServiceUrl() {
    return this.post_service_url + "/wall/getLtOfUserImpOnPost";
  }

  getUserListOnshareServiceUrl() {
    return this.post_service_url + "/wall/getLtOfUserShrdPost";
  }

  getSocialLoginServiceUrl() {
    return this.user_service_url + "/reg/getRegSocial";
  }

  getUpdateUserStatusUrl() {
    return this.user_service_url + "/reg/updtUsrStts";
  }

  getUserSocialLoginIdExistServiceUrl() {
    return this.user_service_url + "/sync/getEmail";
  }

  getVideoPostServiceUrl() {
    return this.post_service_url + "/wall/putVdoPost";
  }

  getRepublishcourseServiceUrl() {
    return this.post_service_url + "/pgwall/putCorsRePublishByPageAdmin";
  }

  getPostByTypeServiceUrl() {
    return this.user_service_url + "/profile/typWiseSrchPost";
  }

  getPageCreateServiceUrl() {
    return this.page_service_url + "/page/create";
  }

  getPageDetailsServiceUrl() {
    return this.page_service_url + "/page/getDetail";
  }
  getCourseDetailWithoutTokenUrl() {
    return this.page_service_url + "/page/getPblcPgCrs";
  }
  getPageNameServiceUrl() {
    return this.page_service_url + "/page/chkPageName";
  }
  getPageAboutPagePublishUnpublishServiceUrl() {
    return this.page_service_url + "/page/putPagePublishUnPublish";
  }
  getPageAboutServiceUrl() {
    return this.page_service_url + "/page/getAbout";
  }
  getPageCoursesServiceUrl() {
    return this.page_service_url + "/page/getPageCourses";
  }

  getUserEnrolledCoursesServiceUrl() {
    return this.page_service_url + "/page/getPageMyEnrolledCourses";
  }
  getAllCourseDetail() {
    return this.page_service_url + "/page/getPageAllCourses";
  }
  getAllCourseDetailProfile() {
    return this.page_service_url + "/page/getUsrIntrstMtchCorsV2";
  }

  getAllCourseDetailProfilePublicUrl() {
    return this.page_service_url + "/page/getUsrIntrstMtchCorsV2Pblc";
  }
  getUserInterestGroupCourseUrl() {
    return this.page_service_url + "/page/getUsrIntrstGrpCrs";
  }
  getUserInterestGroupCoursePublicUrl() {
    return this.page_service_url + "/page/getUsrIntrstGrpCrsPblc";
  }


  getUserEnrolledAndInterestCoursesUrl() {
    return this.page_service_url + "/page/getUsrEnrlldAndIntrstCrs";
  }
  getUserEnrolledAndInterestCoursesPublicUrl() {
    return this.page_service_url + "/page/getUsrEnrlldAndIntrstCrsPblc";
  }
  getMyEnrolledCourse() {
    return this.page_service_url + "/page/getMyEnrolledCourseV1";
  }

  getPageFollowServiceUrl() {
    return this.page_service_url + "/page/follow";
  }

  getPageUnFollowServiceUrl() {
    return this.page_service_url + "/page/unFollow";
  }

  getUpdatePageAboutServiceUrl() {
    return this.page_service_url + "/page/updAbout";
  }

  getCheckPageNameServiceUrl() {
    return this.page_service_url + "/page/chkPageName";
  }
  getupldPageNameServiceUrl() {
    return this.page_service_url + "/page/updPageName";
  }

  getUpdatePageNameServiceUrl() {
    return this.page_service_url + "/page/updPageName";
  }
  getUpdatePageAddress() {
    return this.page_service_url + "/page/savUpdAdrs";
  }
  getUpdatePageInterest() {
    return this.page_service_url + "/page/savUpdPgIntrst";
  }
  getUpdatePageGenInfo() {
    return this.page_service_url + "/page/savUpdGenInfo";
  }
  getUpdatePageInfo() {
    return this.page_service_url + "/page/savUpdPgInfo";
  }

  getPageRatingServiceUrl() {
    return this.page_service_url + "/pageReview/getPageRatings";
  }

  getAddPageReviewServiceUrl() {
    return this.page_service_url + "/pageReview/addReview";
  }
  getDelPageReviewServiceUrl() {
    return this.page_service_url + "/pageReview/delReview";
  }
  getDelCourseReviewServiceUrl() {
    return this.course_service_url + "/courseReview/delReview";
  }

  getPageReviewsServiceUrl() {
    return this.page_service_url + "/pageReview/getReview";
  }

  getPublicPageReviewsServiceUrl() {
    return this.page_service_url + "/pageReview/getReviewPblc";
  }

  getPageReviewImportantServiceUrl() {
    return this.page_service_url + "/pageReview/addImportant";
  }

  getMyPageServiceUrl() {
    return this.page_service_url + "/page/getMyPage";
  }

  getMentorStreamListServiceUrl() {
    return this.page_service_url + "/page/getMntrPedngStrmCrsLstV2";
  }

  getMentorSameTimeStreamListServiceUrl() {
    return this.page_service_url + "/page/getMltPlStrmPpUp";
  }

  getMentorStreamCourseDetailListServiceUrl() {
    return this.page_service_url + "/page/getCrsStrmLst4Mntr";
  }

  getFollowedPageServiceUrl() {
    return this.page_service_url + "/page/getMyFollwPage";
  }

  getAddCommentOnReviewServiceUrl() {
    return this.page_service_url + "/pageReview/addComment";
  }

  getPagePostServiceUrl() {
    return this.post_service_url + "/pgwall/getLatestPagePost";
  }

  getCourseCreateServiceUrl() {
    return this.course_service_url + "/course/create";
  }

  getRatedCourseCountUrl() {
    return this.course_service_url + "/course/getRtdCrsCnt";
  }

  getFixedPopularPagesListUrl() {
    return this.course_service_url + "/course/getPgLst";
  }

  edityourcourse() {
    return this.course_service_url + "/course/putCrsEdtbl";
  }

  setInviteMultipleStreamUrl() {
    return this.course_service_url + "/course/updStrmSttusFrMntrMult";
  }

  getCourseUnpublishedServiceUrl() {
    return this.course_service_url + "/course/putCourseUnPublish";
  }

  getUpdateContentStatusServiceUrl() {
    return this.course_service_url + "/course/updRepSts";
  }

  getUpdateLiveStreamStatusServiceUrl() {
    return this.course_service_url + "/course/updStrmSttusFrMntr";
  }

  getCourseRejectionTrailServiceUrl() {
    return this.course_service_url + "/course/getCorsRejTrail";
  }

  getLiveStreamTokenCheckServiceUrl() {
    return this.course_service_url + "/course/vldtUsrFrStrmV1";
  }

  getLiveStreamCheckTokenStatusUrl() {
    return this.course_service_url + "/course/getAntMdStts";
  }

  getLiveStreamCreateStreamStatusUrl() {
    return this.course_service_url + "/course/crtStrmId";
  }

  getCourseUploadSuccessfulServiceUrl() {
    return this.course_service_url + "/course/updCntntUpldStsV1";
  }
  getCourseCourseMentorStreamStatusUrl() {
    return this.course_service_url + "/course/getCorsLvStrmTrl";
  }
  getCourseTitleUpdateServiceUrl() {
    return this.course_service_url + "/course/updTitle";
  }

  getCheckLiveStreamServiceUrl() {
    return this.course_service_url + "/course/chckLveStrm";
  }

  getCourseDescUpdateServiceUrl() {
    return this.course_service_url + "/course/updDesc";
  }

  getCourseCoverPicUploadServiceUrl() {
    return this.file_service_url + "/upload/corsData";
  }

  getCoursePromoVideoUploadServiceUrl() {
    return this.file_service_url + "/upload/corsPromotional";
  }

  getCourseDownloadableServiceUrl() {
    return this.course_service_url + "/course/putCourseDownloadable";
  }

  getCoursePublishedServiceUrl() {
    return this.course_service_url + "/course/putCorsPub";
  }

  getCoursesendRejectionMsgServiceUrl() {
    return this.course_service_url + "/course/putRepQuey";
  }

  getCourseDescUpdServiceUrl() {
    return this.course_service_url + "/course/updDesc";
  }

  getAddCourseTagServiceUrl() {
    return this.course_service_url + "/course/addCorsTag";
  }

  getPageCourseDetailUrl() {
    return this.course_service_url + "/course/getCorsDetails";
  }

  getCourseSeentUpdateServiceUrl() {
    return this.course_service_url + "/course/updCntntStu";
  }

  getCourseEnrollFreeServiceUrl() {
    return this.course_service_url + "/course/updateUserCorsEnrolled";
  }

  deEnrollCourse() {
    return this.course_service_url + "/course/deEnrolUsr";
  }

  getPurchaseCourseDataServiceUrl() {
    return this.course_service_url + "/course/getPurchaseCourseDetail";
  }

  getPublicCourseDataServiceUrl() {
    return this.course_service_url + "/course/getPblcCrsDtls";
  }

  getWalletDataServiceUrl() {
    return this.purchase_service_url + "/purchase/getWalletAmount";
  }

  getPurchaseHistDataServiceUrl() {
    return this.purchase_service_url + "/purchase/getPurChasedHistory";
  }

  getinprogressstatusServiceUrl() {
    return this.purchase_service_url + "/purchase/checkTrans";
  }

  getPaymentCouponListDataServiceUrl() {
    return this.purchase_service_url + "/purchase/getCoupons";
  }

  getValidateCouponServiceUrl() {
    return this.purchase_service_url + "/purchase/chkPromoCode";
  }

  getPageCourseRatingUrl() {
    return this.course_service_url + "/courseReview/getCourseRatings";
  }
  getCourseReviewRatingUrl() {
    return this.course_service_url + "/courseReview/getImpLtCorsRew";
  }

  getPublicPageCourseRatingUrl() {
    return this.course_service_url + "/courseReview/getPubCorsRtngs";
  }

  getPageCourseReviewUrl() {
    return this.course_service_url + "/courseReview/getCourseReview";
  }

  getPublicPageCourseReviewUrl() {
    return this.course_service_url + "/courseReview/getCorsRwPblc";
  }

  getreviewPagecomment() {
    return this.course_service_url + "/courseReview/getCmmntCorsRew";
  }

  getDelCourseTagServiceUrl() {
    return this.course_service_url + "/course/delCorsTag";
  }

  setCourseValidityServiceUrl() {
    return this.course_service_url + "/course/updValidity";
  }

  setCourseTypeServiceUrl() {
    return this.course_service_url + "/course/updTyp";
  }

  getCurrencyServiceUrl() {
    return this.course_service_url + "/course/getCurrency";
  }

  getCourseAddCostServiceUrl() {
    return this.course_service_url + "/course/updCost";
  }

  getCourseCostDelServiceUrl() {
    return this.course_service_url + "/course/delCost";
  }

  getCourseCRemoveCoverAndVideoServiceUrl() {
    return this.file_service_url + "/upload/remCpicPic";
  }

  getPageReviceCommentServiceUrl() {
    return this.page_service_url + "/pageReview/getCommentOnPageRatings";
  }

  getPageDraftCourseServiceUrl() {
    return this.page_service_url + "/page/getPageMyDraftCourses";
  }
  getPageDraftCourseOldServiceUrl() {
    return this.page_service_url + "/page/getPageMyDraftCoursesOld";
  }

  getPageNonDraftCourseServiceUrl() {
    return this.page_service_url + "/page/getPageMyNonDraftCourses";
  }

  getPagePurchasedCourseServiceUrl() {
    return this.page_service_url + "/page/getUserMyPurchasedCourse";
  }

  getUpdateAcknowledgeMentServiceUrl() {
    return this.course_service_url + "/course/acknowldgmnt";
  }

  getAddUpdSectionServiceUrl() {
    return this.course_service_url + "/courseSection/addUpdate";
  }

  getAddContentServiceUrl() {
    return this.course_service_url + "/course/addCourseContent";
  }

  getAddTestServiceUrl() {
    return this.course_service_url + "/test/createTest";
  }

  getQuizAdminServiceUrl() {
    return this.course_service_url + "/test/getTest4Admin";
  }

  getUpdateTestServiceUrl() {
    return this.course_service_url + "/test/updateTest";
  }

  getUpdateTestDurationServiceUrl() {
    return this.course_service_url + "/test/updtTestDuration";
  }

  getAddQuesToTestServiceUrl() {
    return this.course_service_url + "/test/addQuestion";
  }

  getSaveTestServiceUrl() {
    return this.course_service_url + "/test/savTest4Admin";
  }

  getAddLangToTestServiceUrl() {
    return this.course_service_url + "/test/addLanguageToTest";
  }

  getAddSubjectToTestServiceUrl() {
    return this.course_service_url + "/test/addSubject";
  }

  getAllSubjectOfTestServiceUrl() {
    return this.course_service_url + "/test/getSubject";
  }

  getCreateQuizServiceUrl() {
    return this.course_service_url + "/test/createTest";
  }

  getLinkedURLEmbedeQuizServiceUrl() {
    return this.course_service_url + "/course/addUpdEmbdeTst";
  }

  getAllQuesTextFrmTestServiceUrl() {
    return this.course_service_url + "/test/getAllQstnTxt";
  }

  getAllEssayTextFrmTestServiceUrl() {
    return this.course_service_url + "/test/getAllEssayText";
  }

  getQuesDataFrmTestServiceUrl() {
    return this.course_service_url + "/test/getQuestion";
  }

  deleteQuesFrmTestServiceUrl() {
    return this.course_service_url + "/test/delQuestion";
  }

  getImageUploadTestServiceUrl() {
    return this.file_service_url + "/upload/uldFileAttchTest";
  }

  getUserEnrolledCourseServiceUrl() {
    return this.user_service_url + "/profile/getUserEnrolledCourses";
  }

  getLastActiveTimeServiceUrl() {
    return this.user_service_url + "/profile/setLastActivity";
  }

  getUpdMob4VerificationServiceUrl() {
    return this.user_service_url + "/profile/chngUsrMbl";
  }

  getAllUserFollowedPagesCoursesServiceUrl() {
    return this.user_service_url + "/profile/getUserFollowingPagesCourses";
  }

  getAllUserPurchasedCoursesServiceUrl() {
    return this.user_service_url + "/profile/getUserPurchasedCourse";
  }

  getUserActivityServiceUrl() {
    return this.user_service_url + "/profile/getUsrActLog";
  }

  getAddEssayToTestServiceUrl() {
    return this.course_service_url + "/test/addEssay";
  }

  getUpdateSubjectServiceUrl() {
    return this.course_service_url + "/test/updSubject";
  }

  getSubjectMergeServiceUrl() {
    return this.course_service_url + "/test/subMerge";
  }

  getDeleteSubjectServiceUrl() {
    return this.course_service_url + "/test/delSub";
  }

  getDeleteEssayFromTestServiceUrl() {
    return this.course_service_url + "/test/delEssay";
  }

  getAssociateQuesToEssayServiceUrl() {
    return this.course_service_url + "/test/assoctEssay2Qust";
  }

  getUnAssociateQuesFrmEssayServiceUrl() {
    return this.course_service_url + "/test/unAssoctEssay2Qust";
  }

  getTestContentUploadServiceUrl() {
    return this.file_service_url + "/upload/corsLecDocData";
  }

  getTestContentUploadServiceUrlFrontEnd() {
    return this.course_service_url + "/course/crtLctrDcmntCntnt";
  }

  getRejecteionTrailImageUploadServiceUrl() {
    return this.file_service_url + "/upload/updRejectComment";
  }
  getURLContentUploadServiceUrl() {
    return this.course_service_url + "/course/addUpdVdoLinkCtnt";
  }

  getLinkedBasedUrlServiceUrl() {
    return this.course_service_url + "/course/getEmbddTstDtls";
  }

  getStreamDataServiceUrl() {
    return this.course_service_url + "/course/getStrmDt";
  }

  getRemovePictureServiceUrl() {
    return this.file_service_url + "/upload/remCpicPic";
  }

  getEncTestDataUsrServiceUrl() {
    return this.file_service_url + "/download/downldTest";
  }

  getVideoUrlServiceUrl() {
    return this.file_service_url + "/download/getVdoURL";
  }

  getEssayByIdServiceUrl() {
    return this.course_service_url + "/test/getEssay";
  }

  getTestQuesUpdateServiceUrl() {
    return this.course_service_url + "/test/updateQuestionToTest";
  }

  getUpdateEssayServiceUrl() {
    return this.course_service_url + "/test/updEssay";
  }

  getTestDetailsServiceUrl() {
    return this.course_service_url + "/test/getTestDetails";
  }

  getSaveResponseServiceUrl() {
    return this.course_service_url + "/test/savResponse";
  }

  getAddTestUserServiceUrl() {
    return this.course_service_url + "/test/addTestUsr";
  }

  getSubmitTestServiceUrl() {
    return this.course_service_url + "/test/submitTest";
  }

  getTestSolutionServiceUrl() {
    return this.course_service_url + "/test/getTestSolution";
  }

  getUuidToNameServiceUrl() {
    return this.course_service_url + "/course/getUrlPstCrsUsr";
  }

  getTestContentStatusServiceUrl() {
    return this.course_service_url + "/course/getUsrCntntStatus";
  }

  getContentDetailsServiceUrl() {
    return this.course_service_url + "/course/getCntntDetails";
  }

  getDeleteCourseSectionServiceUrl() {
    return this.course_service_url + "/course/delCorsSection";
  }

  getDeleteCourseSectionContentServcieUrl() {
    return this.course_service_url + "/course/delCorsCntnData";
  }

  getCourseLangDetailsServiceUrl() {
    return this.course_service_url + "/course/addCorsLang";
  }
  getCourseContentNameUpdateServiceUrl() {
    return this.course_service_url + "/course/updContentName";
  }
  getCourseLevelDetailsServiceUrl() {
    return this.course_service_url + "/course/addCorsLvl";
  }

  getCourseDetailsServiceUrl() {
    return this.course_service_url + "/course/getCorsDetls";
  }

  getCourseContentVisiblityServiceUrl() {
    return this.course_service_url + "/course/updCntntVisibility";
  }

  getCourseDataServiceUrl() {
    return this.course_service_url + "/course/getCorsLib";
  }

  getTokenforLinkedBasedDataServiceUrl() {
    return this.course_service_url + "/course/getTknFrEmbddTst";
  }

  getUpdateContentOrderServiceUrl() {
    return this.course_service_url + "/course/updCntntOrdr";
  }

  getUserCourseListServiceUrl() {
    return this.course_service_url + "/course/getUsrCrsLst";
  }

  getCourseAnalyticsServiceUrl() {
    return this.course_service_url + "/course/getCrsAnlytcs";
  }
  getEnrolledUserContactDetailsApiUrl() {
    return this.course_service_url + "/course/getEnrlldUsrCntctDtls";
  }
  getCourseAnalyticsFlwServiceUrl() {
    return this.course_service_url + "/course/getCrsAnlytcsSrc";
  }

  getUpdateSectionOrderServiceUrl() {
    return this.course_service_url + "/course/updSecOrdr";
  }
  getUpdateInterestServiceUrl() {
    return this.course_service_url + "/course/updIntr";
  }

  getCourseSectionContentListServiceUrl() {
    return this.course_service_url + "/course/getCorsSecCntntLib";
  }

  getDataLiveClass() {
    return this.course_service_url + "/course/getStrmWlDt";
  }
  getDataLiveClassWthOtTkn() {
    return this.course_service_url + "/course/getStrmWlDtPblc";
  }

  getLiveClassesDtl() {
    return this.course_service_url + "/course/getAllStrmDtls";
  }
  getLiveClassesDtlWthOtTkn() {
    return this.course_service_url + "/course/getAllStrmDtlsPblc";
  }

  getArticleServiceUrl() {
    return this.article_service_url + "/article/getArtlDt";
  }
  delArticleServiceUrl() {
    return this.article_service_url + "/article/delArtl";
  }

  getAllCourseLibraryServiceUrl() {
    return this.course_service_url + "/course/getImportDataCourse";
  }

  getCourseCouponApplyServiceUrl() {
    return this.course_service_url + "/course/updCouponEnabDisab";
  }

  getUrlForLiveStreamingData() {
    return this.course_service_url + "/course/crtUpdLvStrm";
  }

  getUrlForLiveStreamMentor() {
    return this.user_service_url + "/profile/getUsrDtls";
  }

  getCancelFrndReqServiceUrl() {
    return this.connection_service_url + "/connReq/updConnUnReq";
  }

  getInterestPagePostServiceUrl() {
    return this.post_service_url + "/pgwall/getLatestPagePostWithIntrest";
  }

  getInterestPagePostWithDateServiceUrl() {
    return this.post_service_url + "/pgwall/getLatestPagePostWithIntrestWthDat";
  }

  getUserImpOnRevieServiceUrl() {
    return (
      this.page_service_url + "/pageReview/getImportantCommentOnPageRatings"
    );
  }

  getFollowedPagePostServiceUrl() {
    return this.post_service_url + "/pgwall/getLatestFollwPagePost";
  }

  getFollowedPagePostWithDateServiceUrl() {
    return this.post_service_url + "/pgwall/getLatestFollwPagePostWthDat";
  }
  getPageArticlesWithoutToken() {
    return this.post_service_url + "/pgwall/getPbLtPgPost";
  }

  getSearchedPageDataServiceUrl() {
    return this.page_service_url + "/page/getPageData4Srch";
  }

  getInviteFrndServiceUrl() {
    return this.user_service_url + "/invite/sendInvitation";
  }

  getClaimOtpSendServiceUrl() {
    return this.page_service_url + "/page/getOtp4ClaimPage";
  }

  getVerifyClaimPageServiceUrl() {
    return this.page_service_url + "/page/verOtp4claimPage";
  }

  getInviteFriends4PageServiceUrl() {
    return this.page_service_url + "/page/getLtOfInviteFrnd";
  }

  getAdminStreamCorsListServiceUrl() {
    return this.page_service_url + "/page/getAdmnStrmCrsLst ";
  }

  getAdminStreamCorsInnerListServiceUrl() {
    return this.page_service_url + "/page/getCrsStrmLst4Admn";
  }

  getSendInviteFriends4PageServiceUrl() {
    return this.page_service_url + "/page/inviteFrnd";
  }

  getInterestPageServiceUrl() {
    return this.page_service_url + "/page/getPgIntrst";
  }

  getPostTypeWiseSearchPageServiceUrl() {
    return this.page_service_url + "/page/typWiseSrchPgPost";
  }

  getPostTypeWiseSearchPublicPageServiceUrl() {
    return this.post_service_url + "/wall/typWiseSrchPgPostPblc";
  }

  getUploadImageOnPageServiceUrl() {
    return this.file_service_url + "/upload/uldPageGallery";
  }

  getpageGalleryServiceUrl() {
    return this.page_service_url + "/page/getPageGallery";
  }

  getPublicpageGalleryServiceUrl() {
    return this.page_service_url + "/page/getPubPgGalry";
  }

  getAllRecievePagemsgServiceUrl() {
    return this.message_service_url + "/message/getAllPageRecvMsg";
  }

  getPageSuggestionServiceUrl() {
    return this.suggestion_service_url + "/suggest/get10SuggestPage";
  }

  getPublicPageSuggestionServiceUrl() {
    return this.suggestion_service_url + "/suggest/get10SggstPgPblc";
  }

  getAllPageSuggestionServiceUrl() {
    return this.suggestion_service_url + "/suggest/getAllSuggestPage";
  }

  getPublicProfilePostServiceUrl() {
    return this.post_service_url + "/wall/getPostWallStrPublic";
  }

  getPublicProfilePost4ServiceUrl() {
    return this.post_service_url + "/wall/getPostWallStrPublic4SingleV1";
  }

  getUploadOrgServiceUrl() {
    return this.file_service_url + "/upload/uldOrgnlImg";
  }

  getRemovePageFGalleryImageServiceUrl() {
    return this.file_service_url + "/upload/remPgGalImg";
  }

  getPublicPostDataWithTokenServiceUrl() {
    return this.post_service_url + "/wall/getPostWallStrV1";
  }

  getUserDetailsPublicServiceUrl() {
    return this.user_service_url + "/profile/getUserDetailsPublic";
  }

  getUserConnectionPublicServiceUrl() {
    return this.connection_service_url + "/connReq/get10Conn";
  }

  getUserPostPublicServiceUrl() {
    return this.post_service_url + "/wall/getLtPIds4PublicPost10";
  }

  getSolarSrchInsServiceUrl() {
    return this.search_service_url + "/solr/getSearchedInst";
  }

  getUpdateActivityListServiceUrl() {
    return this.search_service_url + "/search/updateAct";
  }

  getSolarSrchCouServiceUrl() {
    return this.search_service_url + "/solr/getSearchedProgm";
  }

  getSolarSrchPosServiceUrl() {
    return this.search_service_url + "/solr/getSearchedPositn";
  }

  getSolarSrchOrgServiceUrl() {
    return this.search_service_url + "/solr/getSearchedOrg";
  }

  getSearchPublicPost() {
    return this.search_service_url + "/search/get15SrchPblcPst";
  }

  getPublicPostData4Search() {
    return this.post_service_url + "/wall/getPblcPstDt4Srch";
  }

  getCheckTokenServiceUrl() {
    return this.user_service_url + "/token/chkTokenWeb";
  }

  getAddCourseRatingServiceUrl() {
    return this.course_service_url + "/courseReview/addUpdReview";
  }

  updateImportantToReview() {
    return this.course_service_url + "/courseReview/addUpdImportant";
  }

  delCmmntOnReview() {
    return this.course_service_url + "/courseReview/delCmmntOnReview";
  }

  getCourseData4Srch() {
    return this.course_service_url + "/course/getCourseData4Srch";
  }

  getCourseArchiveServiceUrl() {
    return this.course_service_url + "/course/arcCourse";
  }

  courseAddUpdReviewComment() {
    return this.course_service_url + "/courseReview/addUpdReviewComment";
  }

  getDeviceAuthForSocialserviceUrl() {
    return this.course_service_url + "/course/getDvcAthPrmtrs";
  }

  getAuthStatusForSocialserviceUrl() {
    return this.course_service_url + "/course/chckDvcAthStts";
  }

  getCreateLiveStreamWithIdRestUrl() {
    return this.course_service_url + "/course/crtStrmIdV1";
  }

  getUpdDeviceIdRestUrl() {
    return this.course_service_url + "/course/addUpdSclAthId";
  }

  getMergeSocialWithStreamRestUrl() {
    return this.course_service_url + "/course/addSclEndPotJs";
  }

  getDltSocialRestUrl() {
    return this.course_service_url + "/course/delBrdCst";
  }

  getAddUpdTrialRestUrl() {
    return this.course_service_url + "/course/crtUpdSbsc";
  }

  getSubscribeCourseRestUrl() {
    return this.course_service_url + "/course/updUsrCrsSbscrptn";
  }

  getPurchasedCourseDetail() {
    return this.purchase_service_url + "/purchase/getPurChasedCorsDetail";
  }

  getArticleCvrUpldUrl() {
    return this.file_service_url + "/upload/uldRmvArtlPcV1";
  }

  getArticleBodyImgUpldUrl() {
    return this.file_service_url + "/upload/updArtclImg";
  }

  getArticleCreateUpdtdUrl() {
    return this.article_service_url + "/article/crtUpdArtl";
  }

  getSingleArticleDataUrl() {
    return this.article_service_url + "/article/getSnglArtlDtAdmn";
  }

  getArticleSinglePostView() {
    return this.article_service_url + "/article/getSnglArtlDt";
  }

  getArticleSinglePostOnlyTextView() {
    return this.article_service_url + "/article/getSnglArtlTxtDt";
  }

  getPublishArticleRestURL() {
    return this.article_service_url + "/article/pubArtl";
  }
  getArticleSinglePostView_withoutToken() {
    return this.article_service_url + "/article/getSnglArtlDtPblc";
  }
  getMarketPlaceDetailsUrl() {
    return this.utility_service_url + "/utility/getMrktPlcDt"
  }
  getBestSellingCoursesUrl() {
    return this.utility_service_url + "/utility/getBstSllngCrs"
  }
  getRelatedDataSinglePostPublic() {
    return this.search_service_url + "/search/getRltdDtPblc";
  }
  getWallSearchViewData() {
    return this.search_service_url + "/search/wallV1";
  }
  getLeaderboard() {
    return this.ldrBoard_service_url + "/ldrBord/getLdrBrdV1";
  }
  getCurrentPoints() {
    return this.ldrBoard_service_url + "/ldrBord/getCurrntPnt";
  }
  getRankStatics() {
    return this.ldrBoard_service_url + "/ldrBord/getUsrRnkSttstcs";
  }
  getUserRewardDetails() {
    return this.ldrBoard_service_url + "/ldrBord/getUsrRwrdDtls";
  }
  getUserDetailsForLeaderBoard() {
    return this.ldrBoard_service_url + "/ldrBord/getUsrDtl";
  }
  getSearchWallHeaderUrl() {
    return this.search_service_url + "/";
  }

  setToken(token: string) {
    this.access_token = token;
    localStorage.setItem("t", token); // changed
  }

  getInterest() {
    this.fetchDataApiWithoutBody(this.getInterestv1ServiceUrl()).subscribe(
      (data) => {
        let responseData: any = data;
        let interestData = {};

        for (let i = 0; i < responseData.INTERESTS_DATA.length; i++) {
          for (
            let j = 0;
            j < responseData.INTERESTS_DATA[i].INTERESTS.length;
            j++
          ) {
            interestData[
              responseData.INTERESTS_DATA[i].INTERESTS[j].INTEREST_ID
            ] = responseData.INTERESTS_DATA[i].INTERESTS[j].INTEREST_NAME;
          }
        }

        //this._constantService.setInterestObj(responseData.INTERESTS);
        this.setSessionJsonPair("interests", JSON.stringify(interestData));
      }
    );
  }

  setPageUuid(pageUuids: string) {
    localStorage.setItem("pg_uuids", pageUuids);
  }

  getPageUuid() {
    return localStorage.getItem("pg_uuids");
  }

  setCourseUuid(courseUUID: string) {
    localStorage.setItem("courseUUID", courseUUID);
  }

  getCourseUuid() {
    return localStorage.getItem("courseUUID");
  }

  getToken() {
    if (localStorage.getItem("t") && localStorage.getItem("t") != "undefined") {
      // changed
      return localStorage.getItem("t");
    } else {
      return this.access_token;
    }
  }

  deleteToken() {
    localStorage.removeItem("t"); // changed
  }

  setMobileVer(mobileVer: string) {
    localStorage.setItem("v_m", mobileVer); // changed
  }

  getMobileVer() {
    return localStorage.getItem("v_m"); // changed
  }

  deleteMobileVer() {
    localStorage.removeItem("v_m");
  }

  setEmailVer(emailVer: string) {
    localStorage.setItem("v_e", emailVer);
  }

  getEmailVer() {
    return localStorage.getItem("v_e");
  }

  deleteEmailVer() {
    localStorage.removeItem("v_e");
  }

  clearUserInfo() {
    localStorage.clear();
  }

  setFriendsId(friendsId: string) {
    localStorage.setItem("f_id", friendsId);
  }

  getFriendsId() {
    return localStorage.getItem("f_id");
  }

  setFollowedId(followedId: string) {
    localStorage.setItem("followedId", followedId);
  }

  getFollowedId() {
    return localStorage.getItem("followedId");
  }

  setFollowingId(followingId: string) {
    localStorage.setItem("followingId", followingId);
  }

  getFollowingId() {
    return localStorage.getItem("followingId");
  }

  setLoginCountPlus() {
    var x = 0;
    if (localStorage.getItem("login_count") != null) {
      var count = parseInt(localStorage.getItem("login_count")) + 1;
      localStorage.setItem("login_count", count.toString());
    } else {
      localStorage.setItem("login_count", (x + 1).toString());
    }
  }

  getLoginCount() {
    return localStorage.getItem("login_count");
  }

  setLoginCountMinus() {
    var count = parseInt(localStorage.getItem("login_count")) - 1;
    localStorage.setItem("login_count", count.toString());
  }

  setLoginCountReset() {
    localStorage.setItem("login_count", "0");
  }

  getUserInterest() {
    return localStorage.getItem("user_interest");
  }

  setBackToCourse(back: string) {
    return localStorage.setItem("backtocourse", back);
  }

  getBackToCourse() {
    return localStorage.getItem("backtocourse");
  }

  getLtPostInterest() {
    return localStorage.getItem("LtPost_interest");
  }

  setUserInterest(interestIds: any) {
    localStorage.setItem("user_interest", interestIds);
  }

  setAllLanguageObj(data: any) {
    localStorage.setItem("lang", JSON.stringify(data));
  }

  getAllLanguageObj() {
    return localStorage.getItem("lang");
  }

  setLtPostInterest(interestIds: string) {
    localStorage.setItem("LtPost_interest", interestIds);
  }

  getEmail() {
    return this._encryptionService.decrypt(localStorage.getItem("em")); // changed
  }

  setEmail(email: string) {
    email = this._encryptionService.encrypt(email);
    localStorage.setItem("em", email); // changed
  }

  getMobile() {
    return localStorage.getItem("mn"); // changed
  }

  setMobile(mobile: string) {
    localStorage.setItem("mn", mobile); // changed
  }

  getCountry() {
    return localStorage.getItem("country");
  }

  setCountry(country: string) {
    localStorage.setItem("country", country);
  }

  getSummary() {
    return localStorage.getItem("summ");
  }

  setSummary(summ: string) {
    localStorage.setItem("summ", summ);
  }

  getConnection() {
    return localStorage.getItem("conn"); // changed
  }

  setConnection(connections: string) {
    localStorage.setItem("conn", connections); // changed
  }

  getFollowers() {
    return localStorage.getItem("followers");
  }

  setFollowers(followers: string) {
    localStorage.setItem("followers", followers);
  }

  getFollowings() {
    return localStorage.getItem("followings"); // changed
  }

  setFollowings(followings: string) {
    localStorage.setItem("followings", followings); // changed
  }

  setUserName(username: string) {
    localStorage.setItem("username", username);
  }

  getUserName() {
    return localStorage.getItem("username");
  }

  setMyProfile(profile: string) {
    localStorage.setItem("myprofile", profile); // changed
  }

  getMyProfile() {
    return localStorage.getItem("myprofile"); // changed
  }

  set10ConnRecId(ids: string) {
    localStorage.setItem("10ConnRecId", ids); // not in use
  }

  get10ConnRecId() {
    return localStorage.getItem("10ConnRecId"); // not in use
  }

  set20ConnRecId(ids: string) {
    localStorage.setItem("20ConnRecId", ids); // not in use
  }

  get20ConnRecId() {
    return localStorage.getItem("20ConnRecId"); // not in use
  }

  setLcLogin(lc: string) {
    localStorage.setItem("lc_data", lc); // changed
  }

  getLcLogin() {
    return localStorage.getItem("lc_data"); // changed
  }

  setProfilePicPath(path: string) {
    localStorage.setItem("p_pic", path); // changed
  }

  getProfilePicPath() {
    return localStorage.getItem("p_pic"); // changed
  }

  setProfilePicS3Path(path: string) {
    localStorage.setItem("p_pics3", path); // changed
  }

  getProfilePicS3Path() {
    return localStorage.getItem("p_pics3"); // changed
  }

  setUserId(path: number) {
    localStorage.setItem("u_id", path.toString()); // changed
  }

  getUserId() {
    return parseInt(localStorage.getItem("u_id")); // changed
  }

  setMessageData(data: any) {
    localStorage.setItem("m_data", JSON.stringify(data)); //not in use
  }

  getMessageData() {
    var arr = [];
    arr = JSON.parse(localStorage.getItem("m_data")); //not in use
    return arr;
  }

  setCommentData(data: any) {
    localStorage.setItem("cmnt_data", JSON.stringify(data)); //not in use
  }

  getCommentData() {
    var arr = [];
    arr = JSON.parse(localStorage.getItem("cmnt_data")); //not in use
    return arr;
  }

  setFullName(data: string) {
    localStorage.setItem("full_name", data); //changed
  }

  getFullName() {
    return localStorage.getItem("full_name"); //changed
  }

  setInterestObj(data: any) {
    localStorage.setItem("iid", JSON.stringify(data)); //changed
  }

  getInterestObj() {
    return JSON.parse(localStorage.getItem("iid")); //changed
  }

  setFriendUserId(data) {
    localStorage.setItem("otherUid", JSON.stringify(data)); //changed
  }

  getFriendUserId() {
    return JSON.parse(localStorage.getItem("otherUid")); //changed
  }

  setPostId(data: string) {
    localStorage.setItem("pid", data); //changed
  }

  getPostId() {
    return localStorage.getItem("pid"); //changed
  }

  setPageDetails(data: any) {
    localStorage.setItem("pageData", JSON.stringify(data)); //changed
  }

  getPageDetails() {
    return JSON.parse(localStorage.getItem("pageData")); //changed
  }

  setSocialLoginTrue(data) {
    localStorage.setItem("socLog", data); //changed
  }

  getSocialLoginTrue() {
    return localStorage.getItem("socLog"); //changed
  }

  setUserInterestIds(data) {
    localStorage.setItem("usr_intrst", data); //changed
  }

  getUserInterestIds() {
    return localStorage.getItem("usr_intrst"); //changed
  }

  setPageTitle(data) {
    localStorage.setItem("pg_title", data); //changed
  }

  getPageTitle() {
    return localStorage.getItem("pg_title"); //changed
  }

  setPageIdForCourse(data) {
    localStorage.setItem("pg_Id", data); //changed
  }
  setStagCompltdForCourse(data) {
    localStorage.setItem("CorsStg", data); //not in use
  }
  getStagCompltdForCourse() {
    return localStorage.getItem("CorsStg"); //not in use
  }

  setPublicClickedUrl(data) {
    localStorage.setItem("publicClickedURL", data); //changed
  }

  getPageIdForCource() {
    return localStorage.getItem("pg_Id"); //changed
  }

  getPublicClickedUrl() {
    return localStorage.getItem("publicClickedURL"); //changed
  }

  setSessionJsonPair(key, value) {
    var sessionStr = localStorage.getItem("sessionData");
    if (sessionStr) {
      var session = JSON.parse(this._encryptionService.decrypt(sessionStr));
      if (key == "token" && value == "") {
        session[key] = this.access_token;
      } else {
        if (key) {
          session[key] = value ? value.toString() : "";
        }
      }
      localStorage.setItem(
        "sessionData",
        this._encryptionService.encrypt(JSON.stringify(session))
      );
    } else {
      localStorage.setItem(
        "sessionData",
        this._encryptionService.encrypt(JSON.stringify({}))
      );
      this.setSessionJsonPair(key, value);
    }
    if (key == "token") {
      this.access_token = value;
    }
    if (key == "publicClickedURL") {
      var expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 7);
      this._cookie.set("publicClickedURL", value, expiredDate, "/");
    }
  }

  getSessionDataBYKey(key) {
    var sessionStr = localStorage.getItem("sessionData");
    if (sessionStr && sessionStr != "undefined") {
      var session = JSON.parse(this._encryptionService.decrypt(sessionStr));
      if (key) {
        return session[key];
      } else {
        return session;
      }
    } else {
      if (key == "token") {
        return this.access_token;
      }
    }
  }

  isEmail(search: string): boolean {
    var regexp = new RegExp(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    );
    return regexp.test(search);
  }

  isMobile(search: string): boolean {
    var regexp = new RegExp(/^[0-9]{10}$/);
    return regexp.test(search);
  }

  isMobileUni(search: string): boolean {
    var regexp = new RegExp(/^[0-9]{5,13}$/);
    return regexp.test(search);
  }

  isWebsite(search: string): boolean {
    var regexp = new RegExp(
      /[a-zA-Z0-9:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9:%_\+.~#?&//=]*)?/
    );
    return regexp.test(search);
  }

  isSpecialChar(search: string): boolean {
    var regexp = new RegExp('/[!@#$%^&*(),.?":{}|<>]/');
    return regexp.test(search);
  }

  isPassword(search: string): boolean {
    var regexp = new RegExp(/^[A-Za-z0-9!@#$%^&*()_=+]{6,20}$/);
    return regexp.test(search);
  }

  isCountry(search: string): boolean {
    var regexp = new RegExp(/^\d+$/);
    return regexp.test(search);
  }

  isValidDate(date: string): boolean {
    var matches = /^(\d{1,2})[\/](\d{1,2})[\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    let composedDate: string;
    let d: number;
    let m: number;
    let y: number;
    d = +matches[1];
    m = +matches[2];
    y = +matches[3];
    return this.isDate(d, m, y);
  }

  isDate(day: number, month: number, year: number): boolean {
    if (day == 0 || year < 1940 || year > 2005) {
      return false;
    }
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        if (day > 31) return false;
        return true;
      case 2:
        if (year % 4 == 0)
          if (day > 29) {
            return false;
          } else {
            return true;
          }
        if (day > 28) {
          return false;
        }

        return true;
      case 4:
      case 6:
      case 9:
      case 11:
        if (day > 30) {
          return false;
        }
        return true;
      default:
        return false;
    }
  }

  profilePic() {
    if (
      this.getSessionDataBYKey("profile_pic_s3") != null &&
      this.getSessionDataBYKey("profile_pic_s3") != ""
    ) {
      return (
        this.getSessionDataBYKey("profile_pic_s3") +
        "profile/" +
        this.getSessionDataBYKey("u_id") +
        "_60x60.png?v=" +
        this.date.getTime()
      );
    } else {
      //this.setProfilePicPath("null");
      this.setSessionJsonPair("p_pic", null);
      return this.defaultImgPath;
    }
  }

  followUnfollow(id, pageId) {
    var followUnfollow = {};
    followUnfollow["token"] = this.getSessionDataBYKey("token");
    followUnfollow["token_param"] = {};
    followUnfollow["token_param"]["device_type"] = "w";
    followUnfollow["token_param"]["host"] = "";
    followUnfollow["pg_uuid"] = pageId;

    var url = "";
    if (id == 0) {
      url = this.getPageFollowServiceUrl();
    } else if (id == 1) {
      url = this.getPageUnFollowServiceUrl();
    }
    this.fetchDataApi(url, followUnfollow).subscribe((data) => {
      var responseData: any = data;
      var status = responseData.STATUS;
      if (status == "success") {
        if (id == 0) {
          //                    this.isfollowed = 1;
          //                    this.follow_count += 1;
        } else {
        }
      }
    });
  }

  private GetEmptystate = new Subject<any>();
  GetEmptystateObservable$ = this.GetEmptystate.asObservable();

  callEmptyStateMethod() {
    this.GetEmptystate.next();
  }

  private closeMmmenu = new Subject<any>();
  GetcloseMmmenuObservable$ = this.closeMmmenu.asObservable();

  callMmmenu() {
    this.closeMmmenu.next();
  }

  private openPopup = new Subject<any>();
  GetopenLoginMmmenuObservable$ = this.openPopup.asObservable();

  openloginPopup() {
    this.openPopup.next();
  }

  type: number; ///******add by vijay//////////
  showToast(message, title, type = null) {
    if (type == 1) {
      this.toastr.success(message, title);
    } else if (type == 2) {
      this.toastr.error(message, title);
    } else if (type == 3) {
      this.toastr.info(message, title);
    } else if (type == 4) {
      this.toastr.warning(message, title);
    }
  }

  createPageProfilePath(
    page_Profile_path,
    page_UUID,
    add_Date_time,
    page_type
  ) {
    if (page_Profile_path) {
      this.page_Profile_path =
        page_Profile_path +
        "profile/" +
        page_UUID +
        "_60x60.png?v=" +
        add_Date_time;
      return this.page_Profile_path;
    } else {
      if (page_type == 0) {
        return this.defaultPageIndImgPath;
      } else {
        return this.defaultPageCollgImgPath;
      }
    }
  }

  createuserProfilePath(page_Profile_path, user_UUID, add_Date_time) {
    if (page_Profile_path) {
      this.user_Profile_path =
        page_Profile_path +
        "profile/" +
        user_UUID +
        "_60x60.png?v=" +
        add_Date_time;
      return this.user_Profile_path;
    } else {
      return this.defaultImgPath;
    }
  }

  fetchDataApi(url: string, params: {}, headers: any = new Headers({ 'Content-Type': 'application/json' })) {
    console.log("sentDATA to : " + url, params);
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var hitObjStr = JSON.stringify(params);
    var encData = this._encryptionService.encryptutf8(hitObjStr);
    var body = JSON.stringify({ 'data': encData });
    // var options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options);
  }


  fetchDataApiWithoutBody(url: string, headers = new Headers({ 'Content-Type': 'application/json' })) {
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // var options = new RequestOptions({ headers: headers });
    return this.http.post(url, options);
  }

  fetchBlobDataApi(url: string, params: {}, headers: any = new Headers({ 'Content-Type': 'application/json' })) {
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let httpParams = new HttpParams();
    httpParams.append('responseType', 'blob')

    var hitObjStr = JSON.stringify(params);
    var encData = this._encryptionService.encrypt(hitObjStr);
    var body = JSON.stringify({ 'data': encData });
    // var options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, { responseType: 'blob' });
  }


  postFormDataApi(
    url: string,
    params: any,
    headers = new Headers({
      "Content-Type":
        "form-data; boundary=----WebKitFormBoundary4WxzcBMzvmJHmsGA",
    })
  ) {

    console.log("sentDATA to : " + url, params);
    var hitObjStr = JSON.stringify(params);
    var encData = this._encryptionService.encrypt(hitObjStr);
    var body = JSON.stringify({ data: encData });
    // var options = new RequestOptions({ headers: headers });
    return this.http.post(url, params);
  }

  uploadFileApi(url: string, data) {
    // let headers = new Headers();
    // headers.delete('Content-Type');
    var options = {
      headers: new HttpHeaders().delete('Content-Type')
    };


    // var options = new RequestOptions({ headers: headers });
    return this.http.post(url, data, options);
  }


  getDataApi(url) {
    return this.http.get(url);
  }
  getDataApiWithParams(url, params) {
    return this.http.get(url, { params: params });
  }

  isExternalLink(link: string) {
    if (link.includes("aio.com")) {
      return false;
    }
    return true;
  }

  getDateFromMilliseconds(format, milliseconds) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var newDate = new Date(milliseconds);
    var date: any = newDate.getDate();
    var month = newDate.getUTCMonth();
    var year = newDate.getFullYear();
    var hours: any = newDate.getHours();
    var minutes: any = newDate.getMinutes();
    var seconds: any = newDate.getSeconds();
    var day: any = newDate.getDay();
    if (date < 10) {
      date = "0" + date;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var monthNum = "";
    month = month + 1;
    if (month < 10) {
      monthNum = "0" + month;
    } else monthNum = month + '';
    switch (format) {
      case "dd mmm, yyyy":
        return date + " " + months[month - 1] + ", " + year;

      case "yyyy-mm-dd hh:mm:ss":
        return (
          year +
          "-" +
          monthNum +
          "-" +
          date +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds
        );

      case "yyyy-mm-dd": return year + "-" + monthNum + "-" + date;
      case "hh:mm": return hours + ":" + minutes;
      case "hh:mm:ss": return hours + ":" + minutes + ":" + seconds;
      case "hh": return hours;
      case "mm": return minutes;
      case "ss": return seconds;
      case "dd mmm yyyy, DDD": return date + " " + months[month - 1] + " " + year + ", " + days[day];
      case "DDD, dd mmmm": return days[day] + " ," + date + "th" + " " + months[month - 1];
      case "dd-mm-yyyy": return date + '-' + monthNum + '-' + year;


      default: return "";
    }
  }

  getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
  getMobileCountryCode(countryId, countryList) {
    for (var i = 0; i < countryList.length; i++) {
      if (countryId == countryList[i].COUNTRY_ID) {
        return countryList[i].COUNTRY_CODE;
      }
    }
    return '';
  }

}
