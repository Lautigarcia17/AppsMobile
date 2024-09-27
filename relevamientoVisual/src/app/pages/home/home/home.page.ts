import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButtons, IonRouterOutlet, IonButton, IonGrid, IonRow, IonCol, IonProgressBar } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonCol, IonRow, IonGrid, IonButton, IonRouterOutlet, IonButtons, IonIcon, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {


  constructor() {
   
  }


}
