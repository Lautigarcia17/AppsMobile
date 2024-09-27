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
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"tabladidactica-a8b5e","appId":"1:449944340534:web:1e548dc08151c21102b097","storageBucket":"tabladidactica-a8b5e.appspot.com","apiKey":"AIzaSyD-oE3-oGwQTDq0iBThV6TSiaWY4mmKNic","authDomain":"tabladidactica-a8b5e.firebaseapp.com","messagingSenderId":"449944340534"})), provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({"projectId":"tabladidactica-a8b5e","appId":"1:449944340534:web:1e548dc08151c21102b097","storageBucket":"tabladidactica-a8b5e.appspot.com","apiKey":"AIzaSyD-oE3-oGwQTDq0iBThV6TSiaWY4mmKNic","authDomain":"tabladidactica-a8b5e.firebaseapp.com","messagingSenderId":"449944340534"})), provideFirestore(() => getFirestore()),
  ],
});
