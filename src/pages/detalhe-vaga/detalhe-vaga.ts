import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FavoritoProvider } from './../../providers/favorito/favorito';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-detalhe-vaga',
  templateUrl: 'detalhe-vaga.html',
  providers: [ VagaProvider, FavoritoProvider, InAppBrowser ]
})
export class DetalheVagaPage {

  _id : any;
  vaga : any;

  constructor(public navCtrl: NavController, 
              private vagaProvider: VagaProvider,
              private favoritoProvider: FavoritoProvider,
              public navParams: NavParams,
              private sharing: SocialSharing
              private iab: InAppBrowser){
    this._id = navParams.get('id');           
  }
  
  close(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    this.vagaProvider.getVaga(this._id).subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            console.log(objeto_retorno);
            this.vaga = objeto_retorno;2
          }, error=>{
            console.log("error");
          }
    )
  }
  
  irParaVaga(link: string){
    const browser = this.iab.create(link);
  }

  salvarFavorito(item: any){
    this.favoritoProvider.save(item);
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
