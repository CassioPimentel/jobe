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
    this.sharing.shareViaWhatsApp("Jobe, aplicativo de vagas gratuitas", null,  "https://play.google.com/store/apps/details?id=io.jobe")
      .then(()=>{
        alert("Success");
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }
 
  twitterShare(){
    this.sharing.shareViaTwitter("Jobe, aplicativo de vagas gratuitas",null ,"https://play.google.com/store/apps/details?id=io.jobe")
    .then(()=>{
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }
 
  facebookShare(){
    this.sharing.shareViaFacebook("Jobe, aplicativo de vagas gratuitas",null,"https://play.google.com/store/apps/details?id=io.jobe")
    .then(()=>{
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }

  EmailShare(){
    this.sharing.shareViaEmail("Jobe, aplicativo de vagas gratuitas", "https://play.google.com/store/apps/details?id=io.jobe", null)
      .then(()=>{
      },
      ()=>{
         alert("Erro ao compartilhar")
      })
  }

  InstagramShare(){
    this.sharing.shareViaInstagram("Jobe, aplicativo de vagas gratuitas", null)
      .then(()=>{
      },
      ()=>{
         alert("Erro ao compartilhar")
      })
  }

}
