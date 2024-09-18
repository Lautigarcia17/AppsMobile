import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButtons, IonRouterOutlet, IonButton, IonGrid, IonRow, IonCol, IonProgressBar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { enterOutline } from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { AuthService } from 'src/app/core/services/auth.service';
import { DatabaseService } from 'src/app/core/services/database.service';
import { ToastService } from 'src/app/core/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonProgressBar, IonCol, IonRow, IonGrid, IonButton, IonRouterOutlet, IonButtons, IonIcon, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage implements OnInit, OnDestroy {
  subscriptionScore!: Subscription;
  isLoading: boolean = true;

  currentIndex = 0;
  categories: Category[] = [
    {
      title: 'FACIL',
      class: 'easy',
      items: []
    },
    {
      title: 'MEDIO',
      class: 'medium',
      items: []
    },
    {
      title: 'DIFICIL',
      class: 'hard',
      items: []
    },
  ];


  constructor(private auth: AuthService, private router: Router, private toast: ToastService, private database: DatabaseService) {
    addIcons({ enterOutline });
  }


  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }

  loadData(): void{
    this.subscriptionScore = this.database.getScores().subscribe({
      next: (result) => {
        this.categories.forEach(category => category.items = []);

        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < this.categories.length; j++) {
            if (result[i].mode.toUpperCase() == this.categories[j].title) {
              this.categories[j].items.push({
                name: result[i].name,
                time: this.convertMillisecondsToSeconds(result[i].time)
              });
            }
          }
        }
        this.categories.forEach(category => {
          category.items.sort((a, b) => a.time - b.time); 
          category.items = category.items.slice(0, 5); 
        });

        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error("Error al cargar los datos", error);
      }

    })
  }



  ngOnDestroy(): void {
    this.currentIndex = 0;
 
    if (this.subscriptionScore) {
      this.subscriptionScore.unsubscribe();
    }
  }


  handleRoute(mode: string) {
    this.router.navigate(['home/juego', mode]);
  }


  logOut() {
    Swal.fire({
      title: "Estas seguro?",
      text: "Volveras al  inicio y tendras que volver a iniciar sesion",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Si',
      confirmButtonColor: 'green',
      cancelButtonText: 'No',
      cancelButtonColor: 'red',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout()
          .then(() => {
            this.toast.CreateTost("Has cerrado la sesion", 'success', 'green')
            this.router.navigate(['login']);
          })
      }

    });
  }

  public nextSlide() {
    if (this.currentIndex < this.categories.length - 1) {
      this.currentIndex++;
    }
  }

  public prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }


  convertMillisecondsToSeconds(milliseconds: number) {
    return Math.floor(milliseconds / 1000);
  }

}
