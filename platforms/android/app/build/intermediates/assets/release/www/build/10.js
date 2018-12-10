webpackJsonp([10],{

/***/ 741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupListPageModule", function() { return GroupListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_list__ = __webpack_require__(761);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GroupListPageModule = /** @class */ (function () {
    function GroupListPageModule() {
    }
    GroupListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__group_list__["a" /* GroupListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__group_list__["a" /* GroupListPage */]),
            ],
        })
    ], GroupListPageModule);
    return GroupListPageModule;
}());

//# sourceMappingURL=group-list.module.js.map

/***/ }),

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_group_group__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_status_status__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utility_toast_toast__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GroupListPage = /** @class */ (function () {
    function GroupListPage(toastProvider, alertCtrl, actionSheetCtrl, statusProvider, groupProvider, navCtrl, navParams) {
        this.toastProvider = toastProvider;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.statusProvider = statusProvider;
        this.groupProvider = groupProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.lock = false;
        this.lock = false;
    }
    GroupListPage.prototype.createGroup = function () {
        if (!this.groupProvider.groupLeaderFlag
            && this.statusProvider.groupStatus != null
            && this.statusProvider.groupStatus.startTime != null
            && this.statusProvider.groupStatus.startTime != '') {
            this.toastProvider.showToast("Your team has started, ask your team leader to end game or invite you out!");
            return;
        }
        this.navCtrl.push("GroupProfilePage");
    };
    GroupListPage.prototype.showDismissAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm dismiss',
            message: 'If group is dismissed, all team members will have to join another group.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Dismiss',
                    handler: function () {
                        _this.statusProvider.deleteGroupStatus(_this.groupProvider.userGroupId).then(function (res) {
                        }).catch(function (err) {
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    GroupListPage.prototype.showGroupOptions = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Options:',
            buttons: [
                {
                    text: 'Edit',
                    handler: function () {
                        _this.editGroup();
                    }
                },
                {
                    text: 'Dismiss',
                    handler: function () {
                        _this.showDismissAlert();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        actionSheet.present();
    };
    GroupListPage.prototype.joinGroup = function (groupId) {
        var _this = this;
        this.lock = true;
        if (this.groupProvider.groupLeaderFlag) {
            this.statusProvider.deleteGroupStatus(this.groupProvider.userGroupId).then(function (res) {
                if (res == true) {
                    _this.joinGroupFurther(groupId);
                }
            }).catch(function (err) {
            });
        }
        else {
            if (this.groupProvider.userGroupId == null || this.groupProvider.userGroupId == '') {
                this.joinGroupFurther(groupId);
            }
            else {
                this.quitGroup().then(function (res) {
                    if (res) {
                        _this.joinGroupFurther(groupId);
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }
    };
    GroupListPage.prototype.clearSearch = function () {
        this.groupProvider.filterString = '';
        this.groupProvider.filterGroupTable();
    };
    GroupListPage.prototype.searchGroup = function (searchBar) {
        var query = searchBar.target.value;
        if (query == '' || query == null || query.trim() == '' || query.trim() == null) {
            this.clearSearch();
            return;
        }
        if (!isNaN(query)) {
            query = parseInt(query) + '';
        }
        query = query.toLowerCase();
        this.groupProvider.filterString = query;
        this.groupProvider.filterGroupTable();
    };
    GroupListPage.prototype.ionViewWillLeave = function () {
        this.groupProvider.filterString = '';
        this.statusProvider.getStatusTableOnce();
    };
    GroupListPage.prototype.joinGroupFurther = function (groupId) {
        var _this = this;
        this.groupProvider.joinGroup(groupId).then(function (res) {
            console.log(res);
            _this.lock = false;
        }).catch(function (err) {
            console.log(err);
            _this.lock = false;
        });
    };
    GroupListPage.prototype.quitGroup = function () {
        var _this = this;
        if (!this.groupProvider.groupLeaderFlag
            && this.statusProvider.groupStatus != null
            && this.statusProvider.groupStatus.startTime != null
            && this.statusProvider.groupStatus.startTime != '') {
            this.toastProvider.showToast("Your team has started, ask your team leader to end game or invite you out!");
            return;
        }
        var promise = new Promise(function (resolve, reject) {
            _this.groupProvider.quitGroup().then(function (res) {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
        });
        return promise;
    };
    GroupListPage.prototype.editGroup = function () {
        this.navCtrl.push("GroupProfilePage", { 'groupId': this.groupProvider.userGroupId });
    };
    GroupListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-group-list',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/chat/group-list/group-list.html"*/'<ion-header>\n\n  <ion-navbar color="eeeGoldLight">\n    <ion-title>Group List</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-searchbar ion-fixed (input)="searchGroup($event)"\n                 (ionClear)="clearSearch()"\n                 placeholder="search by name or group no."></ion-searchbar>\n  <div class="spacer headSpacer"></div>\n  <ion-list>\n    <ion-item *ngFor="let groupId of groupProvider.filteredKeys" text-wrap\n              ngClass="{{groupId==groupProvider.userGroupId?\'selfView\':\'\'}}">\n      <ion-avatar item-start>\n        <img src={{groupProvider.groupTableInfo[groupId].photoUrl}}>\n      </ion-avatar>\n      <h2>{{groupProvider.groupTableInfo[groupId].name}}</h2>\n      <h2 *ngIf="groupProvider.groupTableInfo[groupId].members!=null">\n        {{groupProvider.groupTableInfo[groupId].members.length}}/10\n\n        <span *ngIf="statusProvider.statusTableInfo==null\n      ||statusProvider.statusTableInfo.groups==null\n      ||statusProvider.statusTableInfo.groups[groupId]==null\n      ||statusProvider.statusTableInfo.groups[groupId].startTime==null\n      ||statusProvider.statusTableInfo.groups[groupId].startTime==\'\'"\n              style="color:green" clear>waiting\n      </span>\n\n        <span *ngIf="statusProvider.statusTableInfo!=null\n      &&statusProvider.statusTableInfo.groups!=null\n      &&statusProvider.statusTableInfo.groups[groupId]!=null\n      &&statusProvider.statusTableInfo.groups[groupId].startTime!=null\n      &&statusProvider.statusTableInfo.groups[groupId].startTime!=\'\'"\n              style="color:red"\n            clear>in game\n        </span>\n\n\n      </h2>\n      <p><i>Created on: {{groupId| date:\'HH:mm\'}}</i></p>\n      <p><i>Group no :{{("00"+groupProvider.groupTableInfo[groupId].groupNumber).slice(-3)}}</i></p>\n\n\n\n\n      <button *ngIf="groupProvider.groupTableInfo[groupId].members!=null&&groupProvider.userGroupId!=groupId&&\n                groupProvider.groupTableInfo[groupId].members.length<10" [disabled]="lock" ion-button round outline\n              item-end\n              (click)="joinGroup(groupId)">\n        join\n      </button>\n\n      <button\n        *ngIf="groupProvider.groupTableInfo[groupId].members!=null&&groupProvider.groupTableInfo[groupId].members.length>=10"\n        ion-button clear\n        color="danger" item-end>\n        full\n      </button>\n\n      <button [disabled]="lock" *ngIf="groupProvider.userGroupId==groupId&&groupProvider.groupLeaderFlag" ion-button\n              round outline item-end\n              (click)="showGroupOptions()">options\n      </button>\n      <button [disabled]="lock" *ngIf="groupProvider.userGroupId==groupId\n                &&!groupProvider.groupLeaderFlag" ion-button\n              round outline item-end\n              color="danger" (click)="quitGroup()">quit\n      </button>\n    </ion-item>\n  </ion-list>\n  <button *ngIf="!groupProvider.groupLeaderFlag" outline ion-button block (click)="createGroup()">Create Group</button>\n</ion-content>\n'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/chat/group-list/group-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_utility_toast_toast__["a" /* ToastProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_3__providers_tables_status_status__["a" /* StatusProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_group_group__["a" /* GroupProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], GroupListPage);
    return GroupListPage;
}());

//# sourceMappingURL=group-list.js.map

/***/ })

});
//# sourceMappingURL=10.js.map