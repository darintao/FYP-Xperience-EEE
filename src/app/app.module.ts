import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {SettingProvider} from '../providers/setting/setting';
import {config} from "./firebaseConfig";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuth} from "angularfire2/auth";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {UserProvider} from '../providers/tables/user/user';
import {Network} from '@ionic-native/network';
import {ToastProvider} from '../providers/utility/toast/toast';
import {LoaderProvider} from '../providers/utility/loader/loader';
import {Device} from '@ionic-native/device';
import {GameProvider} from '../providers/tables/game/game';
import {StatusProvider} from '../providers/tables/status/status';
import {GroupProvider} from '../providers/tables/group/group';
import {ChatProvider} from '../providers/tables/chat/chat';
import {Camera} from '@ionic-native/camera';
import {CameraProvider} from '../providers/utility/camera/camera';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {GoogleMaps} from '@ionic-native/google-maps'
import {Geolocation} from '@ionic-native/geolocation';
import {ComponentsModule} from '../components/components.module';
import {CanvasDrawComponent} from '../components/canvas-draw/canvas-draw';
import {NotificationProvider} from '../providers/utility/notification/notification';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {SplashPage} from '../pages/splash/splash';
import {OpenPage} from '../pages/open/open';
import {SpeechRecognition} from '@ionic-native/speech-recognition';
// import { LoginPage } from '../pages/login/login';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AuthService } from '../services/auth.service';
import {LoginPage} from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
// import { SignupPage } from '../pages/signup/signup';
// import {TutorialPage} from '../pages/tutorial/tutorial';




@NgModule({
  declarations: [
    MyApp,
    OpenPage,
    SplashPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    TabsPage
    // LoginPage,
    // TabsPage,
    // SignupPage
  ],
  imports: [
    BrowserModule,
    // IonicModule.forRoot(MyApp),
    //tabsPlacement: 'top',
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: true}),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    ionicGalleryModal.GalleryModalModule,
    NgxErrorsModule,
    // IonicPageModule.forChild(OpenPage),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OpenPage,
    SplashPage,
    LoginPage,
    SignupPage,
    TabsPage,
    ProfilePage,
    CanvasDrawComponent
    // LoginPage,
    // SignupPage,
    // TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingProvider,
    UserProvider,
    AuthService,
    AngularFireAuth,
    Network,
    ToastProvider,
    UserProvider,
    LoaderProvider,
    Device,
    GameProvider,
    StatusProvider,
    GroupProvider,
    ChatProvider,
    Camera,
    CameraProvider,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    GoogleMaps,
    Geolocation,
    LocalNotifications,
    NotificationProvider,
    SpeechRecognition

  ]
})

export class AppModule {
}
