import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FavoritoProvider } from './../../providers/favorito/favorito';
import { CompartilharVagaPage } from '../compartilhar-vaga/compartilhar-vaga';

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
  providers: [ FavoritoProvider ]
})
export class FavoritosPage {

  favoritos: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private favoritoProvider: FavoritoProvider) {             
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){
    this.atualizarFavoritos()
  }

  retirarFavorito(id: string){
    console.log(id);
    this.favoritoProvider.remove(id);
    this.atualizarFavoritos()
  }

  atualizarFavoritos(){
    this.favoritos = this.favoritoProvider.getAll();
  }

  CompartilharVaga(item: any){
    let modal = this.modalCtrl.create(CompartilharVagaPage, { link: item.link });
    modal.present();
  }

}
