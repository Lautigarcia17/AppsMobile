import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import * as echarts from 'echarts';
import Swal from 'sweetalert2';
import { Photo } from 'src/app/core/models/photo';
import { DatabaseService } from 'src/app/core/services/database.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
type EChartsOption = echarts.EChartsOption;


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
  standalone: true,
  imports: [SpinnerComponent,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StatisticsPage implements OnInit {
  photos!: Photo[];
  isLoading!: boolean;

  constructor(private database : DatabaseService) {
    this.isLoading = false;
   }

  ngOnInit() {
    this.isLoading = true;
    this.database.getPhotosDatabase().subscribe(response=>{
        this.photos = response;
        console.log(this.photos)
        this.generateGraphLindas();
        this.generateGraphFeas();
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
    })
  }

  private generateGraphLindas()
  {
    let chartDom = document.getElementById('GraficoLindas')!;
    let myChart = echarts.init(chartDom);
    let option: echarts.EChartsOption;
    let arrayOptions : Array<any> = [];
    let value : number;

    for(let foto of this.photos)
    {
      if(foto.type == 'linda'){
        value = 0;
        for(let vote of foto.votes)
        {
          if(vote)
          {
            value ++;
          }
        }
        arrayOptions.push({value: value, name: foto.user + " - " + foto.day + " - " + foto.time, path: foto.image})
      }
    }

    console.log(arrayOptions);

    option = {
      tooltip: {
        trigger: 'none',
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        left: 'left'
      },
        grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            containLabel: true
        },
      series: [
        {
          name: 'votos',
          type: 'pie',
          radius: '50%',
          data: arrayOptions,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    
    option && myChart.setOption(option);
    myChart.on('click', 'series', function(e)
    {
      let objet : any = e.data;
      let nombre = objet.name.split(" - ")
      let texto = "Foto subida por " + nombre[0].toUpperCase() + " el dia " + nombre [1] + " a las " + nombre[2] + " con " + objet.value + " votos";

      Swal.fire({
        text: texto,
        imageUrl: objet.path,
        imageHeight: 200,
        imageWidth: 200,
        heightAuto: false
      });
    });
  }

  generateGraphFeas()
  {
    let chartDom = document.getElementById('GraficoFeas')!;
    let myChart = echarts.init(chartDom);
    let option: echarts.EChartsOption;
    let arrayNames : Array<any> = [];
    let arrayLikes : Array<any> = [];
    let value : number;

    for(let foto  of this.photos)
    {
      if(foto.type == 'fea'){
        value = 0;
        for(let vote of foto.votes)
        {
          if(vote)
          {
            value ++;
          }
        }
        arrayNames.push( foto.user + " - " + foto.day + " - " + foto.time)
        arrayLikes.push({value: value, path: foto.image})
      }
    }
    console.log(arrayNames);


    option = {

      grid: {
        top: 20,
        bottom: 30
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        data: arrayNames
      },
      series: [
        {
          name: 'votos',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            formatter: '{b}'
          },
          data: arrayLikes
        }
      ]
    };
    
    option && myChart.setOption(option);
    myChart.on('click', 'series', function(e)
    {
      let objet : any = e.data;
      let nombre = e.name.split(" - ")
      let texto = "Foto subida por " + nombre[0] + " El dia: " + nombre [1] + " a las" + nombre[2] + " con " + objet.value + " votos";

      Swal.fire({
        text: texto,
        imageUrl: objet.path,
        imageHeight: 200,
        imageWidth: 200,
        heightAuto: false
      });
    });
  
  }




  
}
