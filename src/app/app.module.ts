import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';

import { TabsPage } from '../pages/tabs/tabs';
import { VagasPage } from '../pages/vagas/vagas';
import { DetalheVagaPage } from '../pages/detalhe-vaga/detalhe-vaga';
import { FiltroPage } from '../pages/filtro/filtro';
import { BuscaPage } from '../pages/busca/busca';
import { PesquisaCidadePage } from '../pages/pesquisa-cidade/pesquisa-cidade';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { PaginaCompartilharPage } from '../pages/pagina-compartilhar/pagina-compartilhar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VagaProvider } from '../providers/vaga/vaga';
import { CidadeProvider } from '../providers/cidade/cidade';
import { FavoritoProvider } from '../providers/favorito/favorito';
import { PesquisaVagaPage } from '../pages/pesquisa-vaga/pesquisa-vaga';
import { CompartilharVagaPage } from '../pages/compartilhar-vaga/compartilhar-vaga';
import { BuscaProvider } from '../providers/busca/busca';
import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';
import { DatabaseFavoritoProvider } from '../providers/database-favorito/database-favorito';
import { ResultadoBuscaPage } from '../pages/resultado-busca/resultado-busca';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    VagasPage,
    DetalheVagaPage,
    FiltroPage,
    BuscaPage,
    PesquisaCidadePage,
    PesquisaVagaPage,
    FavoritosPage,
    PaginaCompartilharPage,
    CompartilharVagaPage,
    ResultadoBuscaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    VagasPage,
    DetalheVagaPage,
    FiltroPage,
    BuscaPage,
    PesquisaCidadePage,
    PesquisaVagaPage,
    FavoritosPage,
    PaginaCompartilharPage,
    CompartilharVagaPage,
    ResultadoBuscaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VagaProvider,
    CidadeProvider,
    FavoritoProvider,
    SocialSharing,
    BuscaProvider,
    SQLite,
    DatabaseProvider,
    DatabaseFavoritoProvider,
    Network
  ]
})
export class AppModule {}
