import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButtons, IonRouterOutlet, IonButton, IonGrid, IonRow, IonCol, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';
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
    addIcons({arrowBackCircleOutline});
   }
 
 
   logOut()
   {
     Swal.fire({
       title: "Estás seguro?",
       text: "Volveras al  inicio y tendras que volver a iniciar sesión",
       icon: "warning",
       showCancelButton: true,
       confirmButtonText: 'Si',
       cancelButtonText: 'No',
       confirmButtonColor: '#fdb32f',
       cancelButtonColor: '#d94241',
       heightAuto: false,
       background: '#1e1e1e',  
       color: '#ffffff',  
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
