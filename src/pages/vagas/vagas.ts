import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { FavoritoProvider } from './../../providers/favorito/favorito';
import { ModalController } from 'ionic-angular';
import { DetalheVagaPage } from '../detalhe-vaga/detalhe-vaga';
import { FiltroPage } from '../filtro/filtro';
import { PaginaCompartilharPage } from '../pagina-compartilhar/pagina-compartilhar';
import { reorderArray } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers: [ VagaProvider, FavoritoProvider ]
})
export class VagasPage {
  
  public lista_vagas = new Array<any>();
  titulo: string;
  cidade: string;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private vagaProvider: VagaProvider,
              private favoritoProvider: FavoritoProvider,
              public modalCtrl: ModalController
              ) {
                
    this.titulo = this.navParams.get('titulo');
    this.cidade = this.navParams.get('cidade');
  }

  public sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
  }

  reorderItems(indexes) {
    let element = this.lista_vagas[indexes.from];
    this.lista_vagas.splice(indexes.from, 1);
    this.lista_vagas.splice(indexes.to, 0, element);
  }

  ionViewDidLoad() {
    console.log(this.titulo);
    console.log(this.cidade);
    if(this.titulo != undefined && this.cidade != undefined){
      this.vagaProvider.buscaVagas(this.titulo, this.cidade).subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            this.lista_vagas = objeto_retorno;
     
            console.log(objeto_retorno);
          }, error=>{
            console.log("error");
          }
      )  
    }else{
      this.vagaProvider.getVagas().subscribe(
        data=>{
          const response = (data as any);
          const objeto_retorno = JSON.parse(response._body);
          console.log(objeto_retorno);
          this.lista_vagas = objeto_retorno;
        }, error=>{
          console.log("error");
        }
      )
    }

  }
  
  detalhe(id: string){
    let modal = this.modalCtrl.create(DetalheVagaPage, {id: id});
    modal.present();
  }
  
  filtro(){
    let modal = this.modalCtrl.create(FiltroPage);
    modal.present();
  }

  PaginaCompartilhar(){
    let modal = this.modalCtrl.create(PaginaCompartilharPage);
    modal.present();
  }
 
  salvarFavorito(item: any){
    this.favoritoProvider.save(item);
  }

}