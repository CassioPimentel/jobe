import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RssConcursosProvider {

  constructor(private http: Http) {}

  public getConcursos() {
      return this.http.get('http://pox.globo.com/rss/g1/concursos-e-emprego/');
  }

}
