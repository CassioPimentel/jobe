//import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VagaProvider {

  

  constructor(private http: Http) {
    console.log('Hello VagaProvider Provider');
  }
  
  getVagas(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://apinodeempregos.herokuapp.com/vagas', options);
  }
  
  getVaga(id: string){
    return this.http.get('https://apinodeempregos.herokuapp.com/vaga/' + id);
  }
  
  buscaVagas(titulo: string, cidade: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://apinodeempregos.herokuapp.com/busca/' + titulo + '/' + cidade, options);
  }

  getNomeVaga(titulo: string){
    return this.http.get('https://apidescricaovagas.herokuapp.com/nomeVaga/' + titulo);
  }

}
