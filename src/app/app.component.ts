import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from './auth.service';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  result: any;
  mesAnoReferenciaMes: any;
  valorRendimentoMesCarteira: any;
  valorRendimentoMesCDI: any;               
  chart: any = [];  
 

  constructor(private service: AuthService) {
    Chart.register(...registerables);
  } 

  ngOnInit() {  
    this.service.cryptoData().subscribe((res) => {
      this.result = res;
      this.valorRendimentoMesCarteira = this.result.listaMesRentabilidade.map((listaMesRentabilidade: any) => listaMesRentabilidade.valorRendimentoMesCarteira);
      this.valorRendimentoMesCDI = this.result.listaMesRentabilidade.map((listaMesRentabilidade: any) => listaMesRentabilidade.valorRendimentoMesCDI);
      this.mesAnoReferenciaMes = this.result.listaMesRentabilidade.map((listaMesRentabilidade: any) => listaMesRentabilidade.mesAnoReferenciaMes);

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.mesAnoReferenciaMes,
          datasets: [
            {
              data: this.valorRendimentoMesCarteira,
              borderColor: '#FDF429',
              fill: false,
              label: 'Capitalização de Mercado',
              backgroundColor: 'rgba(93, 175, 89, 0.1)',
              borderWidth: 3,
            },
            {
              data: this.valorRendimentoMesCDI,
              borderColor: '#3e95cd',
              fill: true,
              label: 'Capitalização de Mercado',
              backgroundColor: 'rgba(93, 175, 89, 0.1)',
              borderWidth: 3,
            },
          ],
        },
      });
    });
  }
  
}