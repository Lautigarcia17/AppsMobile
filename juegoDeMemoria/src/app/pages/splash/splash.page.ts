import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SplashPage{

  constructor(private router: Router) { }



  async ionViewDidEnter() {
      await SplashScreen.hide().then(() => 
      {
        setTimeout(() => 
        {
          this.router.navigateByUrl('login',{replaceUrl: true});
        }, 5000);

      });

  }
}
