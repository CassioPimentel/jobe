import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CidadeProvider {

  constructor(private http: Http) {
    console.log('Hello CidadeProvider Provider');
  }
  
  getCidade(city: string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&language=pt_BR&key=AIzaSyAzGRlCLdl52GRUk3snkZBxxNxoDdnd0wQ', options);
  }

}
