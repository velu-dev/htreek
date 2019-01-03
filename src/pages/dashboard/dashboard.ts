import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  segmentTab: string = "posts";
  public segmentTabs: Array<string> = ['posts', 'upcomming']
  constructor(public navCtrl: NavController) {

  }

}
