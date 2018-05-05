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
  }

  close(){
    this.navCtrl.pop();
  }

  whatsappShare(){
    this.sharing.shareViaWhatsApp("Jobe, aplicativo de vagas gratuitas", null,  this.link)
      .then(()=>{
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }

  EmailShare(){
    this.sharing.shareViaEmail("Jobe, aplicativo de vagas gratuitas", null,  this.link)
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
 
  twitterShare(){
    this.sharing.shareViaTwitter("Jobe, aplicativo de vagas gratuitas" ,null, this.link)
    .then(()=>{
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }
 
  facebookShare(){
    this.sharing.shareViaFacebook("Jobe, aplicativo de vagas gratuitasr",null ,this.link)
    .then(()=>{
      },
      ()=>{
        alert("Erro ao compartilhar")
      })
  }

}
