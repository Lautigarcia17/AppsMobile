import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Photo } from 'src/app/core/models/photo';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.page.html',
  styleUrls: ['./user-photos.page.scss'],
  standalone: true,
  imports: [SpinnerComponent,IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UserPhotosPage implements OnInit {
  photos!: Photo[];
  isLoading!: boolean;

  constructor(private database : DatabaseService, public auth : AuthService) { 
    this.photos = [];
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.database.getPhotosDatabase().subscribe(response=>{
      this.photos = response;
      this.isLoading = false;
    })
  }

}
