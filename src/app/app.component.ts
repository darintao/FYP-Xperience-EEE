import {Component, ViewChild } from '@angular/core';
import {App, MenuController, ModalController, Nav, Platform, Tabs} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {OpenPage} from '../pages/open/open';
import {UserProvider} from '../providers/tables/user/user';
import {User} from '../assets/models/interfaces/User';
import {SplashPage} from '../pages/splash/splash';
// import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile'
import {TabsPage} from '../pages/tabs/tabs';
// import {TutorialPage} from '../pages/tutorial/tutorial';

@Component({ 
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = OpenPage;
  pages;
	// rootPage;

	private app;
	private platform;
	private menu: MenuController;

	@ViewChild(Nav) nav: Nav;


  constructor(modalCtrl: ModalController, userProvider: UserProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      let splash = modalCtrl.create(SplashPage);
      splash.present();
      // splashScreen.hide();

			this.auth.afAuth.authState
				.subscribe(
					user => {
						if (user) {
							this.rootPage = ProfilePage;
						} else {
							this.rootPage = LoginPage;
						}
					},
					() => {
						this.rootPage = LoginPage;
					}
        );
        

        // userProvider.checkUser().then((res: User) => {
        //   if (res == null || (res).edited == null || (res).edited == false) {
        //     this.rootPage = ProfilePage;
        //   }
        //   else {
        //     this.rootPage = 'TutorialPage';
        //   }
        // }).catch((err) => {
        //   console.log("err", err.message);
        // });
      // userProvider.anonymousLogin().then((res) => {
      //   if (res == true) {
      //     console.log("login success");
      //     userProvider.checkUser().then((res: User) => {
      //       if (res == null || (res).edited == null || (res).edited == false) {
      //         this.rootPage = 'ProfilePage';
      //       }
      //       else {
      //         this.rootPage = 'TutorialPage';
      //       }
      //     }).catch((err) => {
      //       console.log("err", err.message);
      //     });
      //   }
      // }).catch((err) => {
      //   console.log("login fail")
      // });

    });
  }
//   constructor(app: App, platform: Platform,
// 		menu: MenuController,
// 		private statusBar: StatusBar,
// 		private auth: AuthService) {
// 		this.menu = menu;
// 		this.app = app;
// 		this.platform = platform;
// 		this.initializeApp();
// 	}

// 	initializeApp() {
// 			this.platform.ready().then(() => {
// 				this.statusBar.styleDefault();
// 			});

// 			this.auth.afAuth.authState
// 				.subscribe(
// 					user => {
// 						if (user) {
// 							this.rootPage = TabsPage;
// 						} else {
// 							this.rootPage = LoginPage;
// 						}
// 					},
// 					() => {
// 						this.rootPage = LoginPage;
// 					}
// 				);
// 	}

// 	login() {
// 		this.menu.close();
// 		this.auth.signOut();
// 		this.nav.setRoot(LoginPage);
// 	}

// 	logout() {
// 		this.menu.close();
// 		this.auth.signOut();
// 		this.nav.setRoot(TabsPage);
// 	}

// 	openPage(page) {
// 	this.menu.close();
// 	this.nav.setRoot(page.component);
// 	}
}
