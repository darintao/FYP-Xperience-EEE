webpackJsonp([11],{

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageModule", function() { return ChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat__ = __webpack_require__(760);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatPageModule = /** @class */ (function () {
    function ChatPageModule() {
    }
    ChatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */])
            ],
        })
    ], ChatPageModule);
    return ChatPageModule;
}());

//# sourceMappingURL=chat.module.js.map

/***/ }),

/***/ 760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_tables_chat_chat__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_tables_user_user__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_utility_camera_camera__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_gallery_modal__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_utility_notification_notification__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatPage = /** @class */ (function () {
    function ChatPage(notificationProvider, modalCtrl, cameraProvider, userProvider, chatProvider, navCtrl, navParams) {
        this.notificationProvider = notificationProvider;
        this.modalCtrl = modalCtrl;
        this.cameraProvider = cameraProvider;
        this.userProvider = userProvider;
        this.chatProvider = chatProvider;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messageTemp = {};
        this.lock = false;
        this.defaultHeight = 0;
        this.previousHeight = 0;
        this.title = this.navParams.get('title');
        this.receiver = this.navParams.get('receiver');
        this.chatProvider.currentView = this.receiver;
        this.chatProvider.newMsgFlag = false;
        this.initMessage();
        this.notificationProvider.clearAllNotification();
    }
    ChatPage.prototype.ionViewDidLoad = function () {
        this.scrollToBottom();
        this.defaultHeight = this.textArea.nativeElement.scrollHeight + 10;
        this.previousHeight = this.defaultHeight;
        this.textArea.nativeElement.style.height = this.defaultHeight + 'px';
    };
    ChatPage.prototype.resize = function () {
        if ((this.textArea.nativeElement.scrollHeight) <= this.previousHeight) {
            return;
        }
        else {
            this.previousHeight = 10 + this.textArea.nativeElement.scrollHeight;
            this.textArea.nativeElement.style.height = this.previousHeight + 'px';
        }
    };
    ChatPage.prototype.ionViewWillLeave = function () {
        this.chatProvider.currentView = '';
        this.chatProvider.newMsgFlag = false;
        this.cameraProvider.initStartUpImage('');
    };
    ChatPage.prototype.onScrollEnd = function () {
        if ((this.content.getContentDimensions().scrollHeight - this.content.getContentDimensions().scrollTop) <= (this.content.getContentDimensions().contentHeight + this.content.getContentDimensions().contentBottom)) {
            this.chatProvider.newMsgFlag = false;
        }
        else {
        }
    };
    ChatPage.prototype.chooseImage = function () {
        this.cameraProvider.presentChoiceNotSupportedForIOS();
    };
    ChatPage.prototype.initMessage = function () {
        this.messageTemp = {};
        this.messageTemp.content = '';
        this.messageTemp.type = this.chatProvider.text;
        this.cameraProvider.initStartUpImage('');
        this.lock = false;
    };
    ChatPage.prototype.sendMessage = function () {
        var _this = this;
        this.lock = true;
        if (this.messageTemp.type == this.chatProvider.text) {
            if (this.messageTemp.content == null || this.messageTemp.content.trim() == '') {
                this.messageTemp.content = '';
                return;
            }
        }
        this.chatProvider.sendMessage(this.receiver, this.messageTemp).then(function (res) {
            _this.initMessage();
            _this.scrollToBottom();
            _this.previousHeight = _this.defaultHeight;
            _this.textArea.nativeElement.style.height = _this.defaultHeight + 'px';
        }).catch(function (err) {
            _this.lock = false;
        });
    };
    ChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 1000);
    };
    ChatPage.prototype.cancelUpload = function () {
        this.initMessage();
    };
    ChatPage.prototype.openImage = function (url) {
        var photos = [];
        photos.push({
            url: url
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5_ionic_gallery_modal__["a" /* GalleryModal */], {
            photos: photos,
            initialSlide: 0
        });
        modal.present();
    };
    ChatPage.prototype.uploadImage = function () {
        var _this = this;
        this.lock = true;
        this.cameraProvider.uploadImage(this.cameraProvider.chatImgRef).then(function (url) {
            _this.messageTemp.content = url;
            _this.messageTemp.type = _this.chatProvider.image;
            _this.sendMessage();
        }).catch(function (err) {
            _this.lock = false;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], ChatPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('textArea'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ChatPage.prototype, "textArea", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/chat/chat/chat.html"*/'<ion-header>\n\n  <ion-navbar color="eeeGoldLight">\n    <ion-title>{{title}}</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="chooseImage()">\n        <ion-icon name="camera"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content #content (ionScrollEnd)="onScrollEnd()">\n  <div class="chatWindow">\n    <ion-list no-lines>\n      <div *ngFor="let messageId of chatProvider.chatTableInfoKeys[receiver]">\n        <ion-item text-wrap\n                  *ngIf="chatProvider.chatTableInfo[receiver][messageId].sender==userProvider.getUid()">\n          <div class="chatBox me">\n            <div class="nameTime">\n              {{userProvider.userTableInfo[chatProvider.chatTableInfo[receiver][messageId].sender].name}}\n              {{chatProvider.chatTableInfo[receiver][messageId].time|date:\'HH:mm\'}}\n            </div>\n            <h5 *ngIf="chatProvider.chatTableInfo[receiver][messageId].type==chatProvider.text">\n              {{chatProvider.chatTableInfo[receiver][messageId].content}}\n            </h5>\n            <img *ngIf="chatProvider.chatTableInfo[receiver][messageId].type==chatProvider.image"\n                 src="{{chatProvider.chatTableInfo[receiver][messageId].content}}"\n                 (click)="openImage(chatProvider.chatTableInfo[receiver][messageId].content)">\n          </div>\n\n        </ion-item>\n\n        <ion-item text-wrap\n                  *ngIf="chatProvider.chatTableInfo[receiver][messageId].sender!=userProvider.getUid()&&chatProvider.chatTableInfo[receiver][messageId].sender==chatProvider.admin">\n          <div class="chatBox admin">\n            <div class="nameTime">\n              {{userProvider.userTableInfo[chatProvider.chatTableInfo[receiver][messageId].sender].name}}\n              {{chatProvider.chatTableInfo[receiver][messageId].time|date:\'HH:mm\'}}\n            </div>\n            <h5 *ngIf="chatProvider.chatTableInfo[receiver][messageId].type==chatProvider.text">\n              {{chatProvider.chatTableInfo[receiver][messageId].content}}\n            </h5>\n\n            <img *ngIf="chatProvider.chatTableInfo[receiver][messageId].type==chatProvider.image"\n                 src="{{chatProvider.chatTableInfo[receiver][messageId].content}}"\n                 (click)="openImage(chatProvider.chatTableInfo[receiver][messageId].content)">\n\n          </div>\n        </ion-item>\n\n        <ion-item text-wrap\n                  *ngIf="chatProvider.chatTableInfo[receiver][messageId].sender!=userProvider.getUid()&&chatProvider.chatTableInfo[receiver][messageId].sender!=chatProvider.admin">\n          <div class="chatBox others">\n            <div class="nameTime">\n              {{userProvider.userTableInfo[chatProvider.chatTableInfo[receiver][messageId].sender].name}}\n              {{chatProvider.chatTableInfo[receiver][messageId].time|date:\'HH:mm\'}}\n            </div>\n            <h5 *ngIf="chatProvider.chatTableInfo[receiver][messageId].type==chatProvider.text">\n              {{chatProvider.chatTableInfo[receiver][messageId].content}}\n            </h5>\n\n            <img *ngIf="chatProvider.chatTableInfo[receiver][messageId].type==chatProvider.image"\n                 src="{{chatProvider.chatTableInfo[receiver][messageId].content}}"\n                 (click)="openImage(chatProvider.chatTableInfo[receiver][messageId].content)">\n\n          </div>\n        </ion-item>\n      </div>\n    </ion-list>\n  </div>\n  <!--showNewMsg-->\n  <div ion-fixed style="width: 100%;top:90%;text-align: center;" *ngIf="chatProvider.newMsgFlag">\n    <button ion-button round outline small (click)="scrollToBottom()">\n      <ion-icon name="arrow-down"></ion-icon>\n      Got new message!\n    </button>\n  </div>\n\n</ion-content>\n<ion-footer ion-fixed>\n  <ion-toolbar no-border no-padding no-margin color="eeeGoldLight">\n    <textarea #textArea id="textArea" rows="1" class="chatInput"\n              *ngIf="cameraProvider.base64Image==null||cameraProvider.base64Image==\'\';"\n              (ionFocus)="scrollToBottom()"\n              [(ngModel)]="messageTemp.content" placeholder="Write sth..."\n              (keyup)="resize()"></textarea>\n    <ion-buttons *ngIf="cameraProvider.base64Image==null||cameraProvider.base64Image==\'\';" end>\n      <button ion-button (click)="sendMessage()">\n        <ion-icon name="send" color="primary"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-item *ngIf="cameraProvider.base64Image!=null&&cameraProvider.base64Image!=\'\';" no-margin no-lines>\n      <button ion-button [disabled]="lock" block outline (click)="uploadImage()">\n        Submit Image\n      </button>\n      <ion-icon item-end name="close-circle" *ngIf="!lock" (click)="cancelUpload()"></ion-icon>\n    </ion-item>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/abblv/Desktop/FYP_Final/FYP_TaoLiran_V2/src/pages/chat/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__providers_utility_notification_notification__["a" /* NotificationProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_utility_camera_camera__["a" /* CameraProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_tables_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_tables_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ })

});
//# sourceMappingURL=11.js.map