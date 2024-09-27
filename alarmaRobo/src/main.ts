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
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"alarmarobo-23190","appId":"1:786111057814:web:18e46a91ade9f18bf617b7","storageBucket":"alarmarobo-23190.appspot.com","apiKey":"AIzaSyAUX6JP6SsQIWfvJQyJtMXlaOgkLOy9FrM","authDomain":"alarmarobo-23190.firebaseapp.com","messagingSenderId":"786111057814"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"alarmarobo-23190","appId":"1:786111057814:web:18e46a91ade9f18bf617b7","storageBucket":"alarmarobo-23190.appspot.com","apiKey":"AIzaSyAUX6JP6SsQIWfvJQyJtMXlaOgkLOy9FrM","authDomain":"alarmarobo-23190.firebaseapp.com","messagingSenderId":"786111057814"})), provideFirestore(() => getFirestore()),
  ],
});
