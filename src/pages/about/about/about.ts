import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Nav} from 'ionic-angular';
import {UserProvider} from '../../../providers/tables/user/user';
import {ProfilePage} from '../../profile/profile';
import { LoginPage } from '../../../pages/login/login';
// import { TabsPage } from '../../../pages/tabs/tabs';
import { AuthService } from '../../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  showContributorFlag = false;
  tapCounter = 0;
  // rootPage;
  @ViewChild(Nav) nav: Nav;

  constructor(private userProvider: UserProvider, public navCtrl: NavController, public navParams: NavParams,private auth: AuthService) {
    this.tapCounter = 0;
  }

  goToAdminPage() {
    this.navCtrl.push("AdminPage");
  }

  editProfile() {
    this.navCtrl.push(ProfilePage, {'uid': this.userProvider.getUid()});
  }

  toggleContributor() {
    this.showContributorFlag = !this.showContributorFlag;
  }

  adminOption() {
    this.tapCounter++;
    if (this.tapCounter >= 7) {
      this.goToAdminPage();
    }
  }


  logout() {
	  this.auth.signOut();
	  this.navCtrl.setRoot(LoginPage);
  }

}
