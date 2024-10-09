import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sendOutline, arrowBackCircleOutline} from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { DayNamePipe } from 'src/app/shared/pipes/day-name.pipe';
import { AuthService } from 'src/app/core/services/auth.service';
import { Message } from 'src/app/core/models/message';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [DayNamePipe,IonButton, IonIcon, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ChatPage implements OnInit {
  section: string;
  arrayMessages!: Message[];
  message! : string;
  lastDay! : string;

  constructor(private location : Location, private route : ActivatedRoute, public auth : AuthService, private database : DatabaseService) { 
    addIcons({arrowBackCircleOutline,sendOutline});
    this.section = '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      setTimeout(() => {
        this.section = params.get('section') ?? '';
      });
    });


    this.database.getMessages()
    .subscribe( (response : Message[]) => {
      this.arrayMessages = [];
      for(let message of response)
      {
        this.arrayMessages.push(message);
      }
    })
  }


  goBack() : void{
    this.location.back();
  }

  sendMessage() : void{
    if (this.message != '') {
      this.database.sendMessage(this.auth.nameUser,this.message, this.section);
      this.message = '';
    }
  }
  
  validateSameDay(date: Date, index: number): boolean {
    if (index === 0) {
      return true;
    }

    const previousMessageDate = new Date(this.arrayMessages[index - 1].time);
  
    const isSameDay = 
      date.getDate() === previousMessageDate.getDate() &&
      date.getMonth() === previousMessageDate.getMonth() &&
      date.getFullYear() === previousMessageDate.getFullYear();
  
    return !isSameDay;
  }



}
