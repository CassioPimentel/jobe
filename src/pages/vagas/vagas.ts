import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VagaProvider } from './../../providers/vaga/vaga';
import { BuscaProvider } from './../../providers/busca/busca';
import { FavoritoProvider } from './../../providers/favorito/favorito';
import { ModalController } from 'ionic-angular';
import { DetalheVagaPage } from '../detalhe-vaga/detalhe-vaga';
import { FiltroPage } from '../filtro/filtro';
import { PaginaCompartilharPage } from '../pagina-compartilhar/pagina-compartilhar';
import { reorderArray } from 'ionic-angular';
import { Vaga } from './vaga';
import { itemBusca } from './itemBusca';
import { CompartilharVagaPage } from '../compartilhar-vaga/compartilhar-vaga';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
  providers: [ VagaProvider, FavoritoProvider, BuscaProvider ]
})
export class VagasPage {
  
  public lista_vagas = new Array<any>();
  titulo: string;
  cidade: string;
  salvo: any;
  vaga: Vaga;
  provider: any;
  public loader;
  public vagas = new Array<Vaga>();
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private vagaProvider: VagaProvider,
              private buscaProvider: BuscaProvider,
              private favoritoProvider: FavoritoProvider,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController
              ) {
                
    this.titulo = this.navParams.get('titulo');
    this.cidade = this.navParams.get('cidade');
    this.provider = this.vagaProvider;

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

  ionViewWillEnter(){
    this.abreCarregando();
    if(this.titulo != undefined && this.cidade != undefined){
        this.vagaProvider.buscaVagas(this.titulo, this.cidade).subscribe(
            data=>{
              const response = (data as any);
              const objeto_retorno = JSON.parse(response._body);

              if(objeto_retorno.length > 0){
                console.log(this.titulo);
                console.log(this.cidade);

                var item = {titulo: this.titulo, cidade: this.cidade};

                this.buscaProvider.save(item);
              }

              this.lista_vagas = objeto_retorno;
              this.fechaCarregando();

            }, error=>{
              this.fechaCarregando();
            }
        )  
      }else{

      var provider = this.provider;
      var page = this;

      var item = this.buscaProvider.get('ultimaVaga');

      Promise.resolve(item.then()).then(function(value) {
        provider.buscaVagas(value.titulo, value.cidade).subscribe(
          data=>{
            const response = (data as any);
            const objeto_retorno = JSON.parse(response._body);
            page.addValue(objeto_retorno);
            page.fechaCarregando();
 
          }, error=>{
            page.fechaCarregando();
          }
        )
      }, function(value) {
        page.fechaCarregando();
      });
      
    } 

  }

  ionViewDidLoad() {
   
  }

  addValue(itens: any){
    this.lista_vagas = itens;
  }

  getValue(id:any){
    this.favoritoProvider.getItem(id).then(function(result) {
                
      if(result == null){
        return 1;
      }else{
        return 0;
      }
    }); 
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
    this.salvo = this.favoritoProvider.save(item);
  }

  CompartilharVaga(item: any){
    let modal = this.modalCtrl.create(CompartilharVagaPage, { link: item.link });
    modal.present();
  }

}