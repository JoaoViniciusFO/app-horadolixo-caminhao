import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[Geolocation]
})
export class HomePage {

  constructor(public navCtrl: NavController, private geo: Geolocation, private http: Http) {
    this.geo.watchPosition()
    .subscribe(
      res => this.notify(res.coords)
    )
  }

  public notify(coords){
    console.log(coords)
    let data = {
      "lat": coords.latitude,
      "long": coords.longitude
    }

    this.http.post("https://limitless-anchorage-11992.herokuapp.com/api/notify-users", data)
    .subscribe(
      res=> console.log(res),
      err=>console.log(err)
    )
  }

}
