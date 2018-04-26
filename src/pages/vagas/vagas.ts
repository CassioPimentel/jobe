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
  public refhesher;
  public isRefheshing: boolean = false;
  
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

  doRefresh(refresher) {
    console.log('entra refresh');
    this.refhesher = refresher;
    this.isRefheshing = true;

    this.carregarVagas();
  }

  carregarVagas(){
    this.abreCarregando();
    if(this.titulo != undefined && this.cidade != undefined){
        this.vagaProvider.buscaVagas(this.titulo, this.cidade).subscribe(
            data=>{
              const response = (data as any);
              const objeto_retorno = JSON.parse(response._body);

              var lista_vaga = new Array<any>();

              objeto_retorno.forEach(element => {
                var vaga: Vaga;
                vaga = element;
  
                var today = new Date();
                var data = new Date(element.data);
  
                var diaInicial = data.getDate();
                var mesInicial = data.getMonth();
                
                var diaFinal = today.getDate();
                var mesFinal = today.getMonth();
                
                if((mesFinal - mesInicial) > 0 ){
                  vaga.dias = '1 mês';
                }else if( (diaFinal - diaInicial) > 7 ){
                  vaga.dias = '1 sem';
                }
  
                lista_vaga.push(vaga);
              });

              if(objeto_retorno.length > 0){
                console.log(this.titulo);
                console.log(this.cidade);

                var item = {titulo: this.titulo, cidade: this.cidade};

                this.buscaProvider.save(item);
              }

              this.lista_vagas = lista_vaga;
              this.fechaCarregando();

              if(this.isRefheshing){
                this.refhesher.complete();
                this.isRefheshing = false;
              }   

            }, error=>{
              this.fechaCarregando();
              if(this.isRefheshing){
                this.refhesher.complete();
                this.isRefheshing = false;
              }   
            }
        )  
      }else{

        var provider = this.provider;
        var page = this;

        var item = this.buscaProvider.get('ultimaVaga');
        
        item.then(function(result) {
                
          if(result != null){
            Promise.resolve(item.then()).then(function(value) {
              provider.buscaVagas(value.titulo, value.cidade).subscribe(
                data=>{
                  const response = (data as any);
                  const objeto_retorno = JSON.parse(response._body);
    
                  var lista_vaga = new Array<any>();
    
                  objeto_retorno.forEach(element => {
                    var vaga: Vaga;
                    vaga = element;
    
                    var today = new Date;
                    var data = new Date(element.data);
    
                    var diaInicial = data.getDate();
                    var mesInicial = data.getMonth();
                    
                    var diaFinal = today.getDate();
                    var mesFinal = today.getMonth();
    
                    console.log(mesFinal - mesInicial);
                    
                    if((mesFinal - mesInicial) > 0 ){
                      vaga.dias = '1 mês';
                    }else if( (diaFinal - diaInicial) > 7 ){
                      vaga.dias = '1 sem';
                    }
    
                    lista_vaga.push(vaga);
                  });
    
                  page.addValue(lista_vaga);
                  page.fechaCarregando();
    
                  console.log(page.isRefheshing);
                  if(page.isRefheshing){
                    console.log('entrou atualizzar vagas');
                    page.refhesher.complete();
                    page.isRefheshing = false;
                  }   
      
                }, error=>{
                  page.fechaCarregando();
                  if(page.isRefheshing){
                    page.refhesher.complete();
                    page.isRefheshing = false;
                  }   
                }
              )
            }, function(value) {
              page.fechaCarregando();
              if(page.isRefheshing){
                page.refhesher.complete();
                page.isRefheshing = false;
              }   
            });
          }else{
            page.fechaCarregando();
          }
        }); 

    } 
  }

  ionViewWillEnter(){
    this.carregarVagas();
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