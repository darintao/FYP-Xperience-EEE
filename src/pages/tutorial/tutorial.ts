import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs'


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';


  constructor(public navCtrl: NavController, public menu: MenuController, public platform: Platform) {
    this.dir = platform.dir();
    this.slides = [
      {
        title: "Welcome to Xperience @EEE+!",
        description: "The <b>Xperience @EEE+</b> is proudly presented by the School of Electrical & Electronic Engineering, Nanyang Technological University",
        image: "../../assets/imgs/eeeLogoGoldSquare.png",
      },
      {
        title: "What is Xperience @EEE+?",
        description: "The <b>Xperience @EEE+</b> is an outdoor escape/adventure game that lets you explore every corner of the School of Electrical & Electronic Engineering in NTU.",
        image: "../../assets/imgs/ica-slidebox-img-4.png",
      },
      {
        title: "How do I play Xperience @EEE+?",
        description: "Form a group with your peers, learn the story of Prof. X and unlock the \"secrete garden\" in EEE!",
        image: "../../assets/imgs/slidebox-img-3.png",
      }
    ];
  }

  startApp() {
    this.navCtrl.setRoot(TabsPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}