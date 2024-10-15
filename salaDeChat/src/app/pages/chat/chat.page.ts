import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ChatPage implements OnInit, AfterViewInit {
  @ViewChild('scrollAnchor', { static: false }) private scrollAnchor!: ElementRef;
  section: string;
  arrayMessages!: Message[];
  message! : string;


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
        if(message.section == this.section){
          this.arrayMessages.push(message);
        }
      }
      this.scrollToBottom();
    })
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(){
    setTimeout(() => {
      if (this.scrollAnchor) {
        this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
