import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButtons, IonRouterOutlet, IonButton, IonGrid, IonRow, IonCol, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonCol, IonRow, IonGrid, IonButton, IonRouterOutlet, IonButtons, IonIcon, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage {

  constructor(private auth : AuthService, private toast : ToastService, private router : Router) {
    addIcons({});
   }


  logOut()
  {
    Swal.fire({
      title: "Estás seguro?",
      text: "Volveras al  inicio y tendras que volver a iniciar sesion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonColor: '#36c375',
      cancelButtonColor: '#d94241',
      heightAuto: false,
      background: '#f5f5f5',  
      color: '#000000',  
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout()
        .then( () =>{
          this.auth.nameUser = '';
          this.toast.CreateTost('Has cerrado sesión','success','green');
          this.router.navigate(['login']);
        })
      }

    });
  }

}
