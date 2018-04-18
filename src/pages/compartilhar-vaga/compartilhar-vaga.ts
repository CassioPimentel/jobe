import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-compartilhar-vaga',
  templateUrl: 'compartilhar-vaga.html',
})
export class CompartilharVagaPage {

  link: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private sharing: SocialSharing) {
    this.link = navParams.get('link');
    console.log(this.link);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompartilharVagaPage');
  }

  close(){
    this.navCtrl.pop();
  }

  whatsappShare(){
    this.sharing.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  this.link /* url */)
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }
 
  twitterShare(){
    this.sharing.shareViaTwitter("Message via Twitter",null /*Image*/,this.link)
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }
 
  facebookShare(){
    this.sharing.shareViaFacebook("Message via Twitter",null /*Image*/,this.link)
    .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  }

}
