import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { VagasPage } from '../vagas/vagas';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = VagasPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
