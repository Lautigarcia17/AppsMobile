import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"relevamientovisual-5dafa","appId":"1:525508155363:web:ab0fe394fa896680ecf2d6","storageBucket":"relevamientovisual-5dafa.appspot.com","apiKey":"AIzaSyB9aPNXU40ylnEqEG7pkI9BSs2Skp844V0","authDomain":"relevamientovisual-5dafa.firebaseapp.com","messagingSenderId":"525508155363"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"relevamientovisual-5dafa","appId":"1:525508155363:web:ab0fe394fa896680ecf2d6","storageBucket":"relevamientovisual-5dafa.appspot.com","apiKey":"AIzaSyB9aPNXU40ylnEqEG7pkI9BSs2Skp844V0","authDomain":"relevamientovisual-5dafa.firebaseapp.com","messagingSenderId":"525508155363"})), provideFirestore(() => getFirestore()),
  ],
});
