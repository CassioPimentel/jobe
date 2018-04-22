import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FavoritoProvider } from './../../providers/favorito/favorito';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vaga } from '../vagas/vaga';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-detalhe-vaga',
  templateUrl: 'detalhe-vaga.html',
  providers: [ VagaProvider, FavoritoProvider, InAppBrowser ]
})
export class DetalheVagaPage {

  _id : any;
  providerVaga: any;
  vaga : any;
  salvo: string;
  public loader;

  constructor(public navCtrl: NavController, 
              private vagaProvider: VagaProvider,
              private favoritoProvider: FavoritoProvider,
              public navParams: NavParams,
              private sharing: SocialSharing,
              private iab: InAppBrowser,
              public loadingCtrl: LoadingController
              ){
    this._id = navParams.get('id');  
    this.providerVaga = this.vagaProvider;
         
  }
  
  close(){
    this.navCtrl.pop();
  }

  abreCarregando() {
  this.loader = this.loadingCtrl.create({
      content: "Carregando",
    });
  this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  ionViewWillEnter(){
    this.abreCarregando();
    var item = this.favoritoProvider.get(this._id);

    var provider = this.vagaProvider;
    var id = this._id;
    var page = this;

    Promise.resolve(item.then()).then(function(value) {
      provider.getVaga(id).subscribe(
        data=>{
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body); 

          var vaga = new Vaga();

          if(value == null){
            page.addText('Salvar');
          }else{
            page.addText('Salvo');
          }

          vaga = objeto_retorno;

          page.fechaCarregando();
          page.addValue(vaga);
        }, error=>{
          page.fechaCarregando();
        }
      )
    }, function(value) {
      // not called
    });
    
  }

  ionViewDidLoad() {
    
  }

  addText(text: any){
    console.log(text);
    this.salvo = text;
  }

  addValue(itens: any){
    this.vaga = itens;
  }
  
  irParaVaga(link: string){
    const browser = this.iab.create(link);
  }

  salvarFavorito(item: any){
    this.favoritoProvider.save(item);
    if(this.salvo == 'Salvar'){
      console.log('primeiro');
      this.salvo = 'Salvo';
    }else{
      console.log('segundo');
      this.salvo = 'Salvar';
    }
  }

  whatsappShare(){
    this.sharing.shareViaWhatsApp("Message via WhatsApp", null /*Image*/,  "https://pointdeveloper.com/" /* url */)
      .then(()=>{
      },
      ()=>{
         alert("Houve um erro ao abrir o WhatsApp")
      })
  }
 
  twitterShare(){
    this.sharing.shareViaTwitter("Message via Twitter",null /*Image*/,"https://pointdeveloper.com")
    .then(()=>{
      },
      ()=>{
         alert("Houve um erro ao abrir o Twitter")
      })
  }
 
  facebookShare(){
    this.sharing.shareViaFacebook("Message via Facebook",null /*Image*/,"https://pointdeveloper.com")
    .then(()=>{
      },
      ()=>{
         alert("Houve um erro ao abrir o Facebook")
      })
  }

}
