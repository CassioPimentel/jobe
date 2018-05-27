import * as xml2js from "xml2js";
import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RssConcursosProvider } from '../../providers/rss-concursos/rss-concursos';

@IonicPage()
@Component({
  selector: 'page-concursos',
  templateUrl: 'concursos.html',
  providers: [ RssConcursosProvider, InAppBrowser ]
})
export class ConcursosPage {

  public rss;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private iab: InAppBrowser,
              private concursosProvider: RssConcursosProvider,) {
  }

  ionViewDidEnter() { 
    console.log('teste');
    var page = this;

    this.concursosProvider.getConcursos().subscribe(
      data=>{
        const response = (data as any);
        xml2js.parseString(response._body, function (err, result) {
          console.log(result);
          page.rss = result.rss.channel["0"].item;
        });
      }
    );
  }

  clickItem(link: string){
    const browser = this.iab.create(link);
  }

}
