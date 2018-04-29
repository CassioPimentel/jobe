import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FavoritoProvider } from './../../providers/favorito/favorito';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vaga } from '../vagas/vaga';
import { LoadingController, ToastController } from 'ionic-angular';
import { DatabaseFavoritoProvider } from '../../providers/database-favorito/database-favorito'

@IonicPage()
@Component({
  selector: 'page-detalhe-vaga',
  templateUrl: 'detalhe-vaga.html',
  providers: [ VagaProvider, FavoritoProvider, InAppBrowser, DatabaseFavoritoProvider ]
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
              private databaseProvider: DatabaseFavoritoProvider,
              public navParams: NavParams,
              private sharing: SocialSharing,
              private iab: InAppBrowser,
              public loadingCtrl: LoadingController,
              private toast: ToastController
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

  ionViewDidEnter(){
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
    //this.favoritoProvider.save(item); 

    this.databaseProvider.insert(item);

    this.favoritoProvider.get(item._id).then(data => {
      if(data == null){
        this.favoritoProvider.insert(item).then(() => {
          this.toast.create({ message: 'Vaga Salva.', duration: 3000, position: 'botton' }).present();
          //this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao salvar a vaga.', duration: 3000, position: 'botton' }).present();
        });
      }else{
        this.favoritoProvider.remove(item._id).then(() => {
          this.toast.create({ message: 'Vaga excluida dos favoritos.', duration: 3000, position: 'botton' }).present();
          //this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao excluir dos favoritos.', duration: 3000, position: 'botton' }).present();
        });
      }
    });

    if(this.salvo == 'Salvar'){
      console.log('primeiro');
      this.salvo = 'Salvo';
    }else{
      console.log('segundo');
      this.salvo = 'Salvar';
    }
  }

  whatsappShare(vaga: any){
    this.sharing.shareViaWhatsApp("Message via WhatsApp", null, vaga.link)
      .then(()=>{
      },
      ()=>{
         alert("Houve um erro ao abrir o WhatsApp")
      })
  }
 
  twitterShare(vaga: any){
    this.sharing.shareViaTwitter("Message via Twitter",null, vaga.link)
    .then(()=>{
      },
      ()=>{
         alert("Houve um erro ao abrir o Twitter")
      })
  }
 
  facebookShare(vaga: any){
    this.sharing.shareViaFacebook("Message via Facebook",null, vaga.link)
    .then(()=>{
      },
      ()=>{
         alert("Houve um erro ao abrir o Facebook")
      })
  }

  EmailShare(vaga: any){
    this.sharing.shareViaEmail("Message via Email", null, vaga.link)
      .then(()=>{
      },
      ()=>{
         alert("Houve um erro ao abrir o Email")
      })
  }

  InstagramShare(){
    this.sharing.shareViaInstagram("Message via Email", null)
      .then(()=>{
      },
      ()=>{
         alert("Houve um erro ao abrir o Instagram")
      })
  }

}
