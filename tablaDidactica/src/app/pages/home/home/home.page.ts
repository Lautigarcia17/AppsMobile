import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButtons, IonRouterOutlet, IonButton, IonGrid, IonRow, IonCol, IonProgressBar, IonFab, IonFabButton, IonFabList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { enterOutline } from 'ionicons/icons';
import { Option } from 'src/app/core/models/option';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonFabList, IonFabButton, IonFab, IonProgressBar, IonCol, IonRow, IonGrid, IonButton, IonRouterOutlet, IonButtons, IonIcon, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {
  option!: string;
  language!: string;
  arrayOptions!: Option[];





  constructor(private auth: AuthService, private toast: ToastService, private router: Router) {
    addIcons({ enterOutline });
    this.setOptions('colores');
    this.setLanguage('castellano');
  }


  logOut() {
    this.auth.logout()
    .then(() => {
      this.auth.nameUser = '';
      this.toast.CreateTost('Has cerrado sesión', 'success', 'green');
      this.router.navigate(['login']);
    })
  }

  listenAudio(value: string) {
    const audio = new Audio('../../../assets/' + this.language + '/' + value + '.ogg');
    audio.play();
  }


  setLanguage(language: string) {
    this.language = language;
  }

  setOptions(option: string) {
    this.option = option
    if (option == 'colores') {
      this.arrayOptions = [
        {
          image: '../../../assets/colores/amarillo.png', value: 'amarillo'
        },
        {
          image: '../../../assets/colores/naranja.png', value: 'naranja'
        },
        {
          image: '../../../assets/colores/negro.png', value: 'negro'
        },
        {
          image: '../../../assets/colores/rojo.png', value: 'rojo'
        },
        {
          image: '../../../assets/colores/verde.png', value: 'verde'
        },
        {
          image: '../../../assets/colores/rosa.png', value: 'rosa'
        },
      ]
    } else if (option == 'numeros') {
      this.arrayOptions = [
        {
          image: '../../../assets/numeros/uno.png', value: 'uno'
        },
        {
          image: '../../../assets/numeros/dos.png', value: 'dos'
        },
        {
          image: '../../../assets/numeros/tres.png', value: 'tres'
        },
        {
          image: '../../../assets/numeros/cuatro.png', value: 'cuatro'
        },
        {
          image: '../../../assets/numeros/cinco.png', value: 'cinco'
        },
        {
          image: '../../../assets/numeros/seis.png', value: 'seis'
        },
      ]
    }
    else {
      this.arrayOptions = [
        {
          image: '../../../assets/animales/cebra.png', value: 'cebra'
        },
        {
          image: '../../../assets/animales/gato.png', value: 'gato'
        },
        {
          image: '../../../assets/animales/pajaro.png', value: 'pajaro'
        },
        {
          image: '../../../assets/animales/perro.png', value: 'perro'
        },
        {
          image: '../../../assets/animales/serpiente.png', value: 'serpiente'
        },
        {
          image: '../../../assets/animales/tortuga.png', value: 'tortuga'
        },

      ]
    }

  }

}
