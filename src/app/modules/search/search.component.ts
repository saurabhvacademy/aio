import { Component, OnInit, ViewContainerRef, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConstantService } from './../../services/constant.service';
import { EncryptionService } from './../../services/encryption.service';
import { PostdataService } from './../../services/postdata.service';
import { SearchdataComponent } from './searchdata/searchdata.component';
import { SearchfilterComponent } from './searchfilter/searchfilter.component';
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss', './../../sharedComponents/peopleyouknow/peopleyouknow.component.scss'],
    providers: [ConstantService, EncryptionService, PostdataService],
    host: {
        '(window:scroll)': 'onScroll($event)'
    }
})
export class SearchComponent implements OnInit {
    scrollForPublic: boolean = false;
    paginationCount: number = 0;
    usrData = {};
    typ: string;
    errorText: string = "";
    senderName = "";
    isError: boolean = false;
    openLoginPopup: boolean = false;
    openLoginPopupType: number = 0;
    userCred = '';
    userPwd = "";
    t: string;
    showCourseViewAll: boolean;
    coursePresent: boolean;
    Preventhit = 1;
    showPreloader: boolean = false;
    @ViewChild('container', { read: ViewContainerRef }) container;
    @ViewChild('courseContainer', { read: ViewContainerRef }) courseContainer;
    @ViewChild(SearchdataComponent) InstanceSearchdataComponent: SearchdataComponent;
    @ViewChild(SearchfilterComponent) searchFilterComponent: SearchfilterComponent;

    searched_user = [];
    searched_page = [];
    postDataDetails = [];
    factory;
    ref;
    showText: boolean = true;
    showUserViewAll: boolean = false;
    showPostViewAll: boolean = false;
    showPageViewAll: boolean = false;
    dataConf = {};
    openConfirmation: boolean = false;
    allResultStatus: number = 0;
    peopleResultStatus = false;
    postResultStatus = false;
    pageResultStatus: boolean = false;
    courseResultStatus: boolean = false;
    postSet = 0;
    userSet = 0;
    pageSet = 0;
    courseSet = 0;
    postPresent: boolean = false;
    userPresent: boolean = false;
    pagePresent: boolean = false;
    continueScroll: boolean = true;
    searchKey = '';
    keyChange = '';
    activeTab = 1;
    showAllpage: boolean = false;
    isHitted: boolean = false;
    showPublic: boolean = false;
    showPostEmptyState: boolean = false;
    showCourseEmptyState: boolean = false;
    startLoader: boolean = true;
    emptyPage: boolean = false;
    emptyPeople: boolean = false;
    tabValue: number = 0;
    fixed: boolean;
    isScrolled = false;
    isScrolled1 = false;
    currPos: Number = 0;
    startPos: Number = 0;
    changePos: Number = 0;
    searchTab = '';
    leftFilterMenu: boolean = false;
    leftFilterMenuonresize: boolean = true;
    header: boolean=false;
    constructor(
        public _constantService: ConstantService,
        private activateParam: ActivatedRoute,
    ) {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth >= 1200) {
            var innerWindWidth = window.innerWidth - 18;
            // this.resize_window = true;
            document.getElementById("windiv").style.width = innerWindWidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("sideThreeCol").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        }
        if (window.innerWidth > 992) {
            let hedder_Width = document.getElementById("stickytab").offsetWidth;
            document.getElementById("header").style.width = hedder_Width + "px";
            this.leftFilterMenuonresize = true;

        }
        else {
            let hedder_Width = document.getElementById("stickytab").offsetWidth;
            document.getElementById("header").style.width = hedder_Width + "px";
            this.leftFilterMenuonresize = false;
        }
    }

    private checkScreenWidth() {
        var winwidth = window.innerWidth - 18;
        if (window.innerWidth >= 1200) {

            document.getElementById("windiv").style.width = winwidth + "px";
        } else {
            document.getElementById("windiv").style.width = "100%";
        }
        if (window.innerWidth >= 768) {
            var rightwidth = document.getElementById("sideThreeCol").offsetWidth;
            var rightinnwidth = rightwidth - 15;
            document.getElementById("someDiv").style.width = rightinnwidth + "px";
            document.getElementById("someDivleft").style.width = rightinnwidth + "px";
        }
        if (window.innerWidth > 992) {
            let hedder_Width = document.getElementById("stickytab").offsetWidth;
            document.getElementById("header").style.width = hedder_Width + "px";
            this.leftFilterMenuonresize = true;

        }
        // if (window.innerWidth > 992) {
        //     let hedder_Width = document.getElementById("centerDiv").offsetWidth;
        //     document.getElementById("header").style.width = (hedder_Width - 30) + "px";
        // }
        else {
            let hedder_Width = document.getElementById("stickytab").offsetWidth;
            document.getElementById("header").style.width = hedder_Width + "px";
            this.leftFilterMenuonresize = false;
        }
    }
    onScroll(evt) {
        var secHeight = document.getElementById('someDiv').offsetHeight;
        var secHeightleft = document.getElementById('someDivleft').offsetHeight;
        var secHeightcenter = document.getElementById('centersection').offsetHeight;
        var innerWindHeight = window.innerHeight - 50;
        var innerWindHeightleft = window.innerHeight - 50;
        if (secHeightcenter > secHeight) {
            if (secHeight > innerWindHeight) {

                var topHeight = secHeight - innerWindHeight;
                this.changePos = secHeight - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;
                    document.getElementById("someDiv").style.top = -topHeight + "px";
                } else {
                    this.isScrolled = false;
                }
            } else {
                var topHeight = secHeight - innerWindHeight;
                this.changePos = secHeight - innerWindHeight;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled = true;
                    document.getElementById("someDiv").style.top = 72 + "px";
                } else {
                    this.isScrolled = false;
                }

            }
        } else {
            this.isScrolled = false;
        }
        if (secHeightcenter > secHeightleft) {
            if (secHeightleft > innerWindHeightleft) {

                var topHeightleft = secHeightleft - innerWindHeightleft;
                this.changePos = secHeightleft - innerWindHeightleft;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled1 = true;
                    document.getElementById("someDivleft").style.top = -topHeightleft + "px";
                } else {
                    this.isScrolled1 = false;
                }
            } else {
                var topHeightleft = secHeightleft - innerWindHeightleft;
                this.changePos = secHeightleft - innerWindHeightleft;
                this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
                if (this.currPos >= this.changePos) {
                    this.isScrolled1 = true;
                    document.getElementById("someDivleft").style.top = 72 + "px";
                } else {
                    this.isScrolled1 = false;
                }

            }
        } else {
            this.isScrolled = false;
        }
    }

    ngOnInit() {
        this.t = this._constantService.getSessionDataBYKey('token');
        if(this.t){
            this.header=true;
        }
        setTimeout(() => {
            this.checkScreenWidth();
        }, 2000);

        this.activateParam.params.subscribe((params: Params) => {
            this.searchKey = params['id'].trim();
            if (params['id'] != null) {
                if (params['tabid'] != null && this.searchTab != params['tabid']) {
                    this.searchTab = params['tabid'];
                    if (params['tabid'] == 'all') {
                        this.searchResultTabClick(0);
                    }
                    else if (params['tabid'] == 'courses') {
                        this.searchResultTabClick(1);
                    }
                    else if (params['tabid'] == 'pages') {
                        this.searchResultTabClick(2);
                    }
                    else if (params['tabid'] == 'people') {
                        this.searchResultTabClick(3);
                    }
                    else if (params['tabid'] == 'posts') {
                        this.searchResultTabClick(4);
                    }
                }
            }
        });
    }




    searchResultTabClick(idx) {
        setTimeout(() => {
            this.InstanceSearchdataComponent.getSearchWallData(idx);

        }, 600);
        window.scrollTo(0, 0);

        if (this.searchFilterComponent && this.tabValue != idx) {
            this.searchFilterComponent.clearFilter();
        }
        this.allResultStatus = idx;


        switch (idx) {
            case 0:
                this.tabValue = idx;
                break;

            case 1:
                this.tabValue = idx;
                break;

            case 2:
                this.tabValue = idx;
                break;

            case 3:
                this.tabValue = idx;
                break;

            case 4:
                this.tabValue = idx;
                break;

        }

    }
    leftSideFilter() {
        this.leftFilterMenu = !this.leftFilterMenu;
        if (this.leftFilterMenu == true) {
            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body-overflow");
        } else {
            let body = document.getElementsByTagName('body')[0];
            body.classList.remove("body-overflow");
        }
    }

}
