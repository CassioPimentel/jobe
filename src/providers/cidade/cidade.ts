import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CidadeProvider {

  constructor(private http: Http) {
    console.log('Hello CidadeProvider Provider');
  }
  
  getCidade(city: string){
    return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&language=pt_BR&key=AIzaSyAzGRlCLdl52GRUk3snkZBxxNxoDdnd0wQ');
  }

}
