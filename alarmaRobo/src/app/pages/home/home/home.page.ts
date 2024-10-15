import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButtons, IonRouterOutlet, IonButton, IonGrid, IonRow, IonCol, IonProgressBar, IonModal, IonList, IonItem, IonLabel, IonImg } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { exitOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import Swal from 'sweetalert2';
import { PluginListenerHandle } from '@capacitor/core/types/definitions';
import { Motion } from '@capacitor/motion';
import { CapacitorFlash } from '@capgo/capacitor-flash';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonImg, FormsModule, IonLabel, IonItem, IonList, IonModal, IonProgressBar, IonCol, IonRow, IonGrid, IonButton, IonRouterOutlet, IonButtons, IonIcon, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {
  isBlocked!: boolean;
  password!: string;
  flagVibration!: boolean;
  flagAbove!: boolean;
  flagLeft!: boolean;
  flagRight!: boolean;
  acceleration!: PluginListenerHandle;

  constructor(private auth: AuthService, private toast: ToastService, private router: Router) {
    addIcons({ exitOutline });
    this.isBlocked = false;
  }


  logOut() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Volveras al  inicio y tendras que volver a iniciar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#393434',
      heightAuto: false,
      background: '#f9f9f9 ',
      color: '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout()
          .then(() => {
            this.auth.nameUser = '';
            this.auth.passwordUser = '';
            this.toast.CreateTost('Has cerrado sesión', 'success', 'green');
            this.router.navigate(['login']);
          })
      }

    });
  }

  async switchAlarm() {
    this.isBlocked = !this.isBlocked;

    if (this.isBlocked) {
      this.flagVibration = true;
      this.flagAbove = true;
      this.flagLeft = true;
      this.flagRight = true;

      this.flagAbove = false;
      setTimeout(() => {
        this.flagAbove = true;
      }, 500);
      this.acceleration = await Motion.addListener('accel', event => {
        if(event.acceleration.x !== 0 && event.acceleration.y !== 0)
        {
          console.log("ACELERACION X:  ",event.acceleration.x)
          console.log("ACELERACION Y: ",event.acceleration.y)
  
        }
        
        if (event.acceleration.x == 0.2 && this.flagRight) {
          this.flagRight = false;
          new Audio("../../../../assets/sounds/right.ogg").play();
          setTimeout(() => {
            // this.flagRight = true;
          }, 3000);
        }
        else if ( event.acceleration.x == -0.1   && this.flagLeft) {
          this.flagLeft = false;
          new Audio("../../../../assets/sounds/left.ogg").play();
          setTimeout(() => {
            // this.flagLeft = true;
          }, 3000);
        }
        else 
        if (event.acceleration.z > 2 && this.flagAbove) {
          this.flagAbove = false;
          CapacitorFlash.switchOn({ intensity: 100 });
          new Audio("../../../../assets/sounds/vertical.ogg").play();
          setTimeout(() => {
            this.flagAbove = true;
            CapacitorFlash.switchOff();
          }, 5000);
        }
        else if (screen.orientation.type.includes("landscape") && this.flagVibration) {
          this.flagVibration = false;
          Haptics.vibrate({ duration: 5000 });
          new Audio("../../../../assets/sounds/horizontal.ogg").play();
          setTimeout(() => {
            this.flagVibration = true;
          }, 6000);
        }
      });
    }

  }

  deactivateAlarm() {
    if (this.password == this.auth.passwordUser) {
      this.toast.CreateTost('Has desactivado la alarma', 'success', 'green');
      this.isBlocked = false;
    }
    else {
      this.toast.CreateTost('Contraseña incorrecta', 'error', 'red');
      new Audio("../../../../assets/sounds/wrongPassword.ogg").play();
    }
    this.password = '';
  }

}
