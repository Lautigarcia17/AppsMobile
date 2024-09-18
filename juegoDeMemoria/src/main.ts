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
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"pruebaapp-91180","appId":"1:654276959944:web:857d8e254778f124a10ffd","storageBucket":"pruebaapp-91180.appspot.com","apiKey":"AIzaSyCQDqeehSWHCbiLWExN87maXGrkD98nOxs","authDomain":"pruebaapp-91180.firebaseapp.com","messagingSenderId":"654276959944"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"pruebaapp-91180","appId":"1:654276959944:web:857d8e254778f124a10ffd","storageBucket":"pruebaapp-91180.appspot.com","apiKey":"AIzaSyCQDqeehSWHCbiLWExN87maXGrkD98nOxs","authDomain":"pruebaapp-91180.firebaseapp.com","messagingSenderId":"654276959944"})), provideFirestore(() => getFirestore()),
  ],
});
