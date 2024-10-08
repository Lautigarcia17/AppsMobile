import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonIcon, IonButtons, IonRouterOutlet, IonButton, IonGrid, IonRow, IonCol, IonProgressBar,IonMenu,IonMenuButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline, heartOutline,heart,arrowUndoOutline,cameraOutline,homeOutline,statsChartOutline,imageOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toast.service';
import Swal from 'sweetalert2';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera'
import { DatabaseService } from 'src/app/core/services/database.service';
import { Photo } from 'src/app/core/models/photo';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterModule,IonLabel, IonItem, IonList, SpinnerComponent,IonProgressBar, IonCol, IonRow, IonGrid, IonButton, IonRouterOutlet, IonButtons, IonIcon, IonInput, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule,IonMenu,IonMenuButton],
})
export class HomePage implements OnInit{
  photos! : Photo[];
  viewList!: boolean;
  currentType!: string;
  isLoading!: boolean;

  constructor(public auth : AuthService, private toast : ToastService, private router : Router, private database : DatabaseService) {
    addIcons({arrowBackCircleOutline,heartOutline,heart,arrowUndoOutline,cameraOutline,homeOutline,statsChartOutline,imageOutline});
    this.viewList = false;
    this.currentType = '';
    // this.auth.nameUser = 'anonimo';

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
   }


  ngOnInit(): void {

    Camera.requestPermissions();
    this.database.getPhotosDatabase().subscribe(response=>{
      this.photos = response;
    })
  }
 

   switchView(type:string){
    this.viewList = true;
    this.currentType = type;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
   }


   async saveImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    const path = await this.database.uploadImage(image.base64String,this.currentType + '/'+ this.auth.nameUser + '-'+Date.now().toString());
    this.database.savePhoto(this.auth.nameUser,path,this.currentType);
    this.toast.CreateTost('Se guardó la imagen','success','green');
   }


   handleViewList(){
    this.viewList= !this.viewList;
   }


   updateLike(id : string, like : boolean){
    this.database.updateLikePhoto(id,this.auth.nameUser, like);
   }

   verifyLike(photo : Photo){
    return photo.votes.some( (element )=> element == this.auth.nameUser);
   }



}
