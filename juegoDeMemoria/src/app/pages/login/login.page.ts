import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonToast, IonCardContent,IonInputPasswordToggle, IonFab, IonFabButton, IonIcon, IonFabList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ToastService } from 'src/app/core/services/toast.service';
import { add} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserCredential } from '@angular/fire/auth';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonFabList, IonIcon, IonFabButton, IonFab, IonInputPasswordToggle,IonCardContent, IonToast, IonCardTitle, IonCardHeader, IonCard, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule,CommonModule],
})
export class Login {
  email!: string;
  password!: string;
  showVisibilityIcon = false;


  constructor(private auth: AuthService, private router: Router, private toast : ToastService, private database : DatabaseService) {
    this.emptyInputs();
    addIcons({add});
  }



  handleVisibilityIcon(event: any) {
    this.showVisibilityIcon = event.target.value !== '';
  }

  login() {
    if (this.email && this.password) {
      this.auth.login(this.email, this.password)
      .then( (response:UserCredential) =>{

        this.database.findUsernameDatabase(response.user.email ?? '')
        .then((username : string)=>{
          this.auth.nameUser = username;
          this.toast.CreateTost('Has iniciado sesion','success','green');
          this.router.navigate(['/home']);
        })



      })
      .catch( (error) =>{
          this.toast.ShowError(error.code);
          console.error(error);
      } )
    }
  }


  emptyInputs() {
    this.email = '';
    this.password = '';
  }

  completeUser(email:string, password:string){
    this.email = email;
    this.password = password;
  }

}