import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [


    provideBrowserGlobalErrorListeners(),

    //Register angular routing using the routes defined in app.routest.ts
    provideRouter(routes),



    //Register Httpclient to communitcation with the backend , such as .net web api
    provideHttpClient()
  ]
};
