import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar,IonMenuToggle, IonTitle, IonContent, IonInput, IonIcon, IonButtons, IonRouterOutlet, IonButton, IonGrid, IonRow, IonCol, IonProgressBar,IonMenu,IonMenuButton, IonList, IonItem, IonLabel,MenuController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.page.html',
  styleUrls: ['home-layout.page.scss'],
  standalone: true,
  imports: [RouterModule,IonMenuToggle,IonLabel, IonItem, IonList, IonIcon, IonButton, IonButtons, IonRouterOutlet, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonMenu,IonMenuButton]
})
export class HomeLayoutPage implements OnInit {

  constructor(private menuController: MenuController,public auth : AuthService, private router : Router, private toast : ToastService) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menuController.close();
  }

  logOut()
  {
    Swal.fire({
      title: "Estás seguro?",
      text: "Volverás al inicio y tendrás que volver a iniciar sesión",
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
          // this.viewList = false;
        })
      }

    });
  }
  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }


}
