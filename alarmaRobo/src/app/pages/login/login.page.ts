import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonToast, IonCardContent,IonInputPasswordToggle, IonFab, IonFabButton, IonIcon, IonFabList, IonItem, IonLabel, IonText } from '@ionic/angular/standalone';
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
  imports: [ReactiveFormsModule,SpinnerComponent ,IonText, IonLabel, IonItem, IonFabList, IonIcon, IonFabButton, IonFab, IonInputPasswordToggle,IonCardContent, IonToast, IonCardTitle, IonCardHeader, IonCard, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule,CommonModule],
})
export class Login {
  showVisibilityIcon : boolean
  isLoading : boolean;

  constructor(private auth: AuthService, private router: Router, private toast : ToastService, private database : DatabaseService, private fb: FormBuilder) {
    this.emptyInputs();
    addIcons({add});
    this.showVisibilityIcon = false;
    this.isLoading = false;
  }

  formUser = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  handleVisibilityIcon(event: any) {
    this.showVisibilityIcon = event.target.value !== '';
  }

  login() {
    this.isLoading = true;
    let email: string = this.formUser.get('email')?.value ?? ''; 
    let password: string = this.formUser.get('password')?.value ?? '';

    if (email && password) {
      this.auth.login(email, password)
      .then( (response:UserCredential) =>{

        this.database.findUsernameDatabase(response.user.email ?? '')
        .then((username : string)=>{
          this.auth.nameUser = username;
          this.isLoading = false;

          this.toast.CreateTost('Has iniciado sesion','success','green');
          this.router.navigate(['/home']);
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
    this.formUser.patchValue({
      "email": '',
      "password": ''
    })
  }

  completeUser(email:string, password:string){
    this.formUser.patchValue({
      "email": email,
      "password": password
    })
  }

}