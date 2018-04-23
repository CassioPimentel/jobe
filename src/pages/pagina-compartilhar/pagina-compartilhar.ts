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

  ionViewDidLoad() {}

  close(){
    this.navCtrl.pop();
  }

  whatsappShare(){
    this.sharing.shareViaWhatsApp("Message via WhatsApp", null,  "https://pointdeveloper.com/")
      .then(()=>{
        alert("Success");
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }
 
  twitterShare(){
    this.sharing.shareViaTwitter("Message via Twitter",null ,"https://pointdeveloper.com")
    .then(()=>{
        alert("Success");
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }
 
  facebookShare(){
    this.sharing.shareViaFacebook("Message via Twitter",null,"https://pointdeveloper.com")
    .then(()=>{
        alert("Success");
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }

  EmailShare(){
    this.sharing.shareViaEmail("Message via Email", null, null)
      .then(()=>{
      },
      ()=>{
         alert("Erro ao compartilhar")
      })
  }

  InstagramShare(){
    this.sharing.shareViaInstagram("Message via Email", null)
      .then(()=>{
      },
      ()=>{
         alert("Erro ao compartilhar")
      })
  }

}
