import { Component, NgZone, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  status: string = 'Unknown';
  constructor(private ngZone: NgZone) { }

  async ngOnInit() {
    const status = await Network.getStatus();
    this.status = status.connectionType;
    await Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', JSON.stringify(status));
      this.ngZone.run(() => {
        this.status = status.connected ? status.connectionType : 'offline';
      });

    });
    App.addListener('resume', async () => {
      const status = await Network.getStatus();
      this.ngZone.run(() => {
        this.status = status.connectionType;
      });
    });
  }

  async getStatus() {
    const status = await Network.getStatus();
    alert(JSON.stringify(status));
  }

}
