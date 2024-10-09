import { Component, OnInit } from '@angular/core';
import { CommonModule,Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFabButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton, IonFab, IonIcon, IonFabList, IonButtons, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Card } from 'src/app/core/models/card';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { cardsEasy, cardsHard, cardsMedium } from 'src/app/shared/cards-data/cards-data';
import { DatabaseService } from 'src/app/core/services/database.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-easy',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonButtons, IonFabList, IonIcon, IonFab, IonButton, IonInput, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonFabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GamePage implements OnInit {
  mode : string = '';


  arrayCards! : Card[][];
  selectedCard! : Card | null;
  blockedClick! : boolean;
  timer! : number;

  constructor(private location : Location, private route: ActivatedRoute, private database : DatabaseService, private auth : AuthService) {
    addIcons({arrowBackCircleOutline});
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mode = params.get('mode') ?? '';
    });
    
    this.startGame();
  }

  startGame(){
    this.timer = Date.now();
    this.arrayCards = [];
    this.selectedCard = null;
    this.blockedClick = false;

    this.arrayCards = this.loadCards(this.mode)

  }

  
  loadCards(mode : string){
    let cards : Card[] = []
    let numColumns : number = 0;
    
    if(mode == 'fácil'){
      numColumns = 2;
      cards = cardsEasy;
    }
    else if(mode == 'medio'){
      cards = cardsMedium;
      numColumns = 2;
    }
    else{
      cards = cardsHard;
      numColumns = 4;
    }

    let totalCards : Card[]= [];
    const groupCards : Card[][] = [];


    for (let i = 0; i < cards.length * 2; i++) {
      totalCards.push({...cards[i %  cards.length]});  
    }
    
    totalCards = totalCards.sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalCards.length; i += numColumns) {
      groupCards.push(totalCards.slice(i,i+numColumns));
    }

    return groupCards;
  }





  turnCard(card : any) : void{

    if(this.blockedClick) return

    card.imageDiscovered = !card.imageDiscovered;

    if(!this.selectedCard)
    {
      this.selectedCard = card;
    }
    else if(this.selectedCard.image == card.image){
      this.selectedCard = null;
      if(this.verifyWinner()){
        this.timer = Date.now() - this.timer;
        if(this.auth.nameUser){
          this.database.saveScore(this.auth.nameUser,new Date(),this.timer, this.mode)
          Swal.fire({
            title: "Felicidades as ganado!!",
            text: `Lo has logrado en ${this.convertSecondsToTime(this.timer)}. Quieres jugar de nuevo?`,
            icon: "success",
            showCancelButton: true,
            allowOutsideClick:false,
            confirmButtonText: 'Si',
            confirmButtonColor: 'green',
            cancelButtonText: 'No',
            cancelButtonColor: 'red',
            heightAuto: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.startGame();
            }else{
              this.goBack();
            }
          });
        }else{
          alert('Debes iniciar sesion')
        }

        
      }
    }
    else{
      this.blockedClick = true;
      setTimeout(() => {
        this.selectedCard!.imageDiscovered = false;
        card.imageDiscovered = false;
        this.selectedCard = null;
        this.blockedClick = false;
      }, 500);
    }
  }

  verifyWinner () : boolean {
    let win : boolean = true;
    let array : Card[]= this.arrayCards.flat();

    for (let i = 0; i < array.length; i++) {
      if(!array[i].imageDiscovered){
        win = false;
        break;
      }
    }

    return win
  }

  convertSecondsToTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }



  goBack() : void{
    this.location.back();
  }
}
