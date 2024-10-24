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
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [SpinnerComponent, IonLabel, IonItem, IonFabList, IonIcon, IonFabButton, IonFab, IonInputPasswordToggle,IonCardContent, IonToast, IonCardTitle, IonCardHeader, IonCard, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule,CommonModule],
})
export class Login {
  email!: string;
  password!: string;
  showVisibilityIcon : boolean
  isLoading : boolean;


  constructor(private auth: AuthService, private router: Router, private toast : ToastService, private database : DatabaseService) {
    this.emptyInputs();
    addIcons({add});
    this.showVisibilityIcon = false;
    this.isLoading = false;
  }



  handleVisibilityIcon(event: any) {
    this.showVisibilityIcon = event.target.value !== '';
  }

  login() {
    this.isLoading = true;
    if (this.email && this.password) {
      this.auth.login(this.email, this.password)
      .then( (response:UserCredential) =>{

        this.database.findUsernameDatabase(response.user.email ?? '')
        .then((username : string)=>{
          this.isLoading = false;
          this.auth.nameUser = username;
          this.toast.CreateTost('Has iniciado sesión','success','green');
          this.router.navigate(['/home']);
          this.emptyInputs();
        })
      })
      .catch( (error) =>{
          this.toast.ShowError(error.code);
          console.error(error);
          this.isLoading = false;
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