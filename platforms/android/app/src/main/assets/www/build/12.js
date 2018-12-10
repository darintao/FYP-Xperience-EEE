webpackJsonp([12],{

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupPageModule", function() { return GroupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_list__ = __webpack_require__(759);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var GroupPageModule = /** @class */ (function () {
    function GroupPageModule() {
    }
    GroupPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat_list__["a" /* ChatListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat_list__["a" /* ChatListPage */]),
            ],
        })
    ], GroupPageModule);
    return GroupPageModule;
}());

//# sourceMappingURL=chat-list.module.js.map

/***/ }),

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_group_group__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_status_status__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_tables_user_user__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_tables_chat_chat__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChatListPage = /** @class */ (function () {
    function ChatListPage(alertCtrl, actionSheetCtrl, chatProvider, userProvider, statusProvider, navCtrl, navParams, groupProvider) {
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.chatProvider = chatProvider;
        this.userProvider = userProvider;
        this.statusProvider = statusProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.groupProvider = groupProvider;
    }
    ChatListPage.prototype.publicChat = function () {
        this.viewedChat(this.chatProvider.public);
        this.navCtrl.push("ChatPage", { "title": "Public Chat", "receiver": this.chatProvider.public });
    };
    ChatListPage.prototype.groupChat = function () {
        this.viewedChat(this.groupProvider.userGroupId);
        this.navCtrl.push("ChatPage", { "title": "Group Chat", "receiver": this.groupProvider.userGroupId });
    };
    ChatListPage.prototype.joinGroup = function () {
        this.navCtrl.push("GroupListPage");
    };
    ChatListPage.prototype.viewedChat = function (receiverId) {
        this.chatProvider.newMsgNo[receiverId] = 0;
        this.chatProvider.getNewMsgCount();
    };
    ChatListPage.prototype.showGroupLeaderOption = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Group Leader Option:',
            buttons: [
                {
                    text: 'Manage Group Member',
                    handler: function () {
                        _this.navCtrl.push('AllUserPage', { 'allUserFlag': false });
                    }
                },
                {
                    text: 'End Game',
                    handler: function () {
                        _this.confirmEndGame();
                    }
                },
                {
                    text: 'Edit Group Profile',
                    handler: function () {
                        _this.editGroup();
                    }
                },
                {
                    text: 'Dismiss Group',
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
    ChatListPage.prototype.showDismissAlert = function () {
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
    ChatListPage.prototype.editGroup = function () {
        this.navCtrl.push("GroupProfilePage", { 'groupId': this.groupProvider.userGroupId });
    };
    ChatListPage.prototype.confirmEndGame = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm ending game',
            message: 'Your team will have to start over!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'End it!',
                    handler: function () {
                        _this.statusProvider.groupForceEnd().then(function (res) {
                        }).catch(function (err) {
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ChatListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-group',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/chat/chat-list/chat-list.html"*/'<ion-header>\n\n    <ion-navbar color="eeeGoldLight">\n      <ion-title>Chat</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content style="text-align: center" padding>\n    <div class="balloonContainer" *ngIf="!groupProvider.firstTimeFlag\n                 &&groupProvider.userGroupId!=null\n                 &&groupProvider.userGroupId!=\'\'\n                 &&groupProvider.groupTableInfo[groupProvider.userGroupId]!=null">\n      <div class="balloon"\n           *ngFor="let memberId of groupProvider.groupTableInfo[groupProvider.userGroupId].members">\n        <img src="{{userProvider.userTableInfo[memberId].photoUrl}}">\n        {{userProvider.userTableInfo[memberId].name}}\n      </div>\n  \n    </div>\n    <ion-item class="transparentBackground" no-lines text-wrap (click)="publicChat()">\n      <ion-avatar item-start>\n        <img src=\'assets/imgs/admin.png\'>\n      </ion-avatar>\n      <h2>Public Chat</h2>\n      <p>Ask admin questions</p>\n      <ion-badge color="eeeBlue"\n                 *ngIf="chatProvider.newMsgNo[chatProvider.public]!=null\n                 &&chatProvider.newMsgNo[chatProvider.public]!=0"\n                 item-end>\n        {{chatProvider.newMsgNo[chatProvider.public]}}\n      </ion-badge>\n    </ion-item>\n    <div *ngIf="!groupProvider.firstTimeFlag\n                 &&groupProvider.userGroupId!=null\n                 &&groupProvider.userGroupId!=\'\'">\n      <ion-item class="transparentBackground selfView" no-lines text-wrap (click)="groupChat()">\n        <ion-avatar item-start>\n          <img src={{groupProvider.groupTableInfo[groupProvider.userGroupId].photoUrl}}>\n        </ion-avatar>\n        <h2>{{groupProvider.groupTableInfo[groupProvider.userGroupId].name}}\n          </h2>\n        <p>Group no: {{("00"+groupProvider.groupTableInfo[groupProvider.userGroupId].groupNumber).slice(-3)}}</p>\n        <p>Chat with your teammates!</p>\n        <ion-badge color="eeeBlue"\n                   *ngIf="chatProvider.newMsgNo[groupProvider.userGroupId]!=null\n                   &&chatProvider.newMsgNo[groupProvider.userGroupId]!=0"\n                   item-end>\n          {{chatProvider.newMsgNo[groupProvider.userGroupId]}}\n        </ion-badge>\n      </ion-item>\n      <div class="spacer buttonSpacer"></div>\n      <button style="margin-top: 10%;" *ngIf="!groupProvider.firstTimeFlag\n                  &&groupProvider.userGroupId!=null\n                  &&groupProvider.userGroupId!=\'\'"\n              ion-button block outline (click)="joinGroup()">\n        Change Group\n      </button>\n      <div class="spacer buttonSpacer"></div>\n      <p *ngIf="!groupProvider.firstTimeFlag\n                  &&groupProvider.userGroupId!=null\n                  &&groupProvider.userGroupId!=\'\'\n                  &&groupProvider.groupLeaderFlag">\n        Got friend arrive late?\n      </p>\n      <p *ngIf="!groupProvider.firstTimeFlag\n                  &&groupProvider.userGroupId!=null\n                  &&groupProvider.userGroupId!=\'\'\n                  &&groupProvider.groupLeaderFlag">\n        Someone wants to quit after game started?\n      </p>\n      <h6 *ngIf="!groupProvider.firstTimeFlag\n                  &&groupProvider.userGroupId!=null\n                  &&groupProvider.userGroupId!=\'\'\n                  &&groupProvider.groupLeaderFlag">\n        Check below!\n        <ion-icon name="happy"></ion-icon>\n      </h6>\n      <button *ngIf="!groupProvider.firstTimeFlag\n                  &&groupProvider.userGroupId!=null\n                  &&groupProvider.userGroupId!=\'\'\n                  &&groupProvider.groupLeaderFlag"\n              ion-button block outline (click)="showGroupLeaderOption()">\n        You Are the Mighty Group Leader\n      </button>\n  \n  \n    </div>\n  \n    <button *ngIf="!groupProvider.firstTimeFlag\n                  &&(groupProvider.userGroupId==null\n                  ||groupProvider.userGroupId==\'\')"\n            ion-button block outline (click)="joinGroup()">Join Group\n    </button>\n  </ion-content>'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/chat/chat-list/chat-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_5__providers_tables_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_tables_status_status__["a" /* StatusProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_group_group__["a" /* GroupProvider */]])
    ], ChatListPage);
    return ChatListPage;
}());

//# sourceMappingURL=chat-list.js.map

/***/ })

});
//# sourceMappingURL=12.js.map