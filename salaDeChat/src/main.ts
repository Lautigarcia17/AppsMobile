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
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"saladechat-97766","appId":"1:180741167100:web:246c7ca251a51978f30479","storageBucket":"saladechat-97766.appspot.com","apiKey":"AIzaSyAZGN0nPrU4mH4zyAj6Eg9ceYc447_u9Vo","authDomain":"saladechat-97766.firebaseapp.com","messagingSenderId":"180741167100"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"saladechat-97766","appId":"1:180741167100:web:246c7ca251a51978f30479","storageBucket":"saladechat-97766.appspot.com","apiKey":"AIzaSyAZGN0nPrU4mH4zyAj6Eg9ceYc447_u9Vo","authDomain":"saladechat-97766.firebaseapp.com","messagingSenderId":"180741167100"})), provideFirestore(() => getFirestore()),
  ],
});
