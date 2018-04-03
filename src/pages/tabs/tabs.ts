import { Component } from '@angular/core';

import { FavoritosPage } from '../favoritos/favoritos';
import { VagasPage } from '../vagas/vagas';
import { BuscaPage } from '../busca/busca';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BuscaPage;
  tab2Root = VagasPage;
  tab3Root = FavoritosPage;

  constructor() {

  }
}
