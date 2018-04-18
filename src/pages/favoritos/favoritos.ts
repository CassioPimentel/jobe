import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FavoritoProvider } from './../../providers/favorito/favorito';

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
              private favoritoProvider: FavoritoProvider) {
    this.atualizarFavoritos()              
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
    console.log('ENTRA ATUALIZA FAVORITOS');
    this.favoritos = this.favoritoProvider.getAll();
  }

}
