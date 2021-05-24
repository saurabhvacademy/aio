import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if(window && window.localStorage.EOC!="show" ){
    window.console.log=function(){};
    window.console.error=function(){};
    window.console.info=function(){};
  }
 }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
