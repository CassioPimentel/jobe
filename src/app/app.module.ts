import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    VagasPage,
    DetalheVagaPage,
    FiltroPage,
    BuscaPage,
    PesquisaCidadePage,
    PesquisaVagaPage,
    FavoritosPage,
    PaginaCompartilharPage,
    CompartilharVagaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    VagasPage,
    DetalheVagaPage,
    FiltroPage,
    BuscaPage,
    PesquisaCidadePage,
    PesquisaVagaPage,
    FavoritosPage,
    PaginaCompartilharPage,
    CompartilharVagaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VagaProvider,
    CidadeProvider,
    FavoritoProvider,
    SocialSharing
  ]
})
export class AppModule {}
