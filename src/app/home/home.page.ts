import { Component, NgZone, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  status: string = 'Unknown';
  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', JSON.stringify(status));
      this.ngZone.run(() => {
        this.status = status.connected ? status.connectionType : 'offline';
      });

    });
  }

}
