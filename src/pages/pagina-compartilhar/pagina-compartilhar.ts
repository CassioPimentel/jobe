import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-pagina-compartilhar',
  templateUrl: 'pagina-compartilhar.html',
})
export class PaginaCompartilharPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private sharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaCompartilharPage');
  }

  close(){
    this.navCtrl.pop();
  }

  whatsappShare(){
    this.sharing.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  "https://pointdeveloper.com/" /* url */)
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }
 
  twitterShare(){
    this.sharing.shareViaTwitter("Message via Twitter",null /*Image*/,"https://pointdeveloper.com")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }
 
  facebookShare(){
    this.sharing.shareViaFacebook("Message via Twitter",null /*Image*/,"https://pointdeveloper.com")
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

}
